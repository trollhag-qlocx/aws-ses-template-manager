const currentVersion = "v1.3";

function populateTextSectionContent() {
  //Will strip template html of html tags leaving inner content for the template text field
  const htmlString = $('#templateHtml').val();
  const textContent = htmlString.replace(/<[^>]*>/g, "");
  $('#templateText').val(textContent);
}

async function checkAppVersion(){
  const versionChecked = sessionStorage.getItem('versionChecked');
  if (!versionChecked) {
    await $.get(`https://api.github.com/repos/MattRuddick/ses-template-manager/tags`, (response) => {
      try {
        const latestVersion = response[0].name;
        if (currentVersion !== latestVersion) {
          sessionStorage.setItem('versionOutdated', 'true');
          sessionStorage.setItem('latestVersion', latestVersion);
        }
      } catch {
        console.warn('App version could not be checked.');
      }
    }).always(() => {
      // still mark versionCheck as done even if request failed. failsafe should the repo/url/git endpoint structure change in the future
      sessionStorage.setItem('versionChecked', 'true'); // indicates we have already checked the version
    });
  }

  if (sessionStorage.getItem('versionOutdated')) {
    const latestVersion = sessionStorage.getItem('latestVersion');
    $('body').append(`<a id="newVersionIndicator" href="https://github.com/MattRuddick/ses-template-manager/releases/tag/${latestVersion}" target="_blank">New Version Available</a>`);
  }
}