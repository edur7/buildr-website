const fetch = require('node-fetch');

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
  const REPO_OWNER = 'edur7';
  const REPO_NAME = 'buildr-website';

  try {
    const formData = JSON.parse(event.body);
    const formName = formData['form-name'] || 'contact';
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const fileName = `${formName}-${timestamp}.txt`;
    const filePath = `submissions/${fileName}`;

    let fileContent = '';
    for (const [key, value] of Object.entries(formData)) {
      if (key !== 'form-name') {
        fileContent += `${key}: ${value}\n`;
      }
    }

    const contentEncoded = Buffer.from(fileContent).toString('base64');

    const githubUrl = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${filePath}`;

    const response = await fetch(githubUrl, {
      method: 'PUT',
      headers: {
        'Authorization': `token ${GITHUB_TOKEN}`,
        'Content-Type': 'application/json',
        'Accept': 'application/vnd.github.v3+json'
      },
      body: JSON.stringify({
        message: `New form submission: ${fileName}`,
        content: contentEncoded,
        committer: {
          name: 'Buildr Contact Form',
          email: 'form@buildrcanada.com'
        }
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('GitHub API Error:', errorData);
      return {
        statusCode: response.status,
        body: JSON.stringify({ message: `Error submitting to GitHub: ${errorData.message}` })
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Form submitted successfully!' })
    };

  } catch (error) {
    console.error('Server Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'An internal error occurred.' })
    };
  }
};
