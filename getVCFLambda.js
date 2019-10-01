const AWS = require('aws-sdk');
const fs = require('fs');
var ses = new AWS.SES();

const SOURCE_EMAIL = 'contactifyllc@gmail.com'

const ddb = new AWS.DynamoDB.DocumentClient();

exports.handler = (event, context, callback) => {

    // console.log('Received event (', , '): ', event);

    // The body field of the event in a proxy integration is a raw string.
    // In order to extract meaningful values, we need to first parse this string
    // into an object. A more robust implementation might inspect the Content-Type
    // header first and use a different parsing strategy based on that value.
    const requestBody = JSON.parse(event.body);

    const { Email } = requestBody;

    getContacts().then((data) => {
        // You can use the callback function to provide a return value from your Node.js
        // Lambda functions. The first parameter is used for failed invocations. The
        // second parameter specifies the result data of the invocation.
        
        console.log(data['Items'])
        
        let vcftext = ''
        
        data['Items'].forEach((item) => {
            vcftext += 'BEGIN:VCARD\nVERSION:3.0\n';
            vcftext += 'FN:' + item.FirstName + ' ' + item.LastName + '\n';
            vcftext += 'N:' + item.LastName + ';' + item.FirstName + ';;;\n';
            vcftext += 'item1.TEL:' + item.PhoneNumber + '\n';
            vcftext += 'item1.X-ABLabel:\nEND:VCARD\n'
        })
        
        // let vcardtxt = 'BEGIN:VCARD\nVERSION:3.0\nFN:Alex Quipp\nN:Quipp;Alex;;;\nitem1.TEL:914-574-7664\nitem1.X-ABLabel:\nEND:VCARD\n'
        
        fs.writeFile('/tmp/test.txt', vcftext, function (err) {
            if (err) {
                context.fail("writeFile failed: " + err);
            }
            
            processFile(Email, callback, context);
        });

        // console.log(fs.readFile());
        // console.log(fileContent);

    }).catch((err) => {
        console.error(err);

        // If there is an error during processing, catch it and return
        // from the Lambda function successfully. Specify a 500 HTTP status
        // code and provide an error message in the body. This will provide a
        // more meaningful error response to the end client.
        errorResponse(err.message, context.awsRequestId, callback)
    });
};

function getContacts() {
    return ddb.scan({
        TableName: 'Contacts',
    }).promise();
}

function processFile(Email, callback, context) {
    
    let data = fs.readFileSync('/tmp/test.txt')
    
    var ses_mail = "From: Contactify LLC <" + SOURCE_EMAIL + ">\n";
    ses_mail += "To: " + Email + "\n";
    ses_mail += "Subject: Your Contact Download\n";
    ses_mail += "MIME-Version: 1.0\n";
    ses_mail += "Content-Type: multipart/mixed; boundary=\"NextPart\"\n\n";
    ses_mail += "--NextPart\n";
    ses_mail += "Content-Type: text/html\n\n";
    ses_mail += "Attached is your contact file download. Download and open it to add contacts to your contact book.\n\n";
    ses_mail += "--NextPart\n";
    ses_mail += "Content-Type: text/plain; name=\"testing.vcf\"\n";
    ses_mail += "Content-Transfer-Encoding: base64\n";
    ses_mail += "Content-Disposition: attachment\n\n";
    ses_mail += data.toString('base64').replace(/([^\0]{76})/g, "$1\n") + "\n\n";
    ses_mail += "--NextPart--";
    
    var params = {
        RawMessage: {Data: ses_mail},
        Source: "Contactify LLC <" + SOURCE_EMAIL + ">'"
    };
    
    ses.sendRawEmail(params, function (err, data) {
        callback(null, {err: err, data: data});
        if (err) {
            console.log(err);
            context.fail(err);
        } else {
            console.log(data);
            context.succeed()
        }
    });

    // Because this Lambda function is called by an API Gateway proxy integration
    // the result object must use the following structure.
    callback(null, {
        statusCode: 201,
        body: JSON.stringify({
            Message: 'Contacts retrieved',
        }),
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
    });
}

function toUrlString(buffer) {
    return buffer.toString('base64')
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=/g, '');
}

function errorResponse(errorMessage, awsRequestId, callback) {
  callback(null, {
    statusCode: 500,
    body: JSON.stringify({
      Error: errorMessage,
      Reference: awsRequestId,
    }),
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  });
}
