StackBlitzSDK.embedProject(
  'embed-stackblitz',
    // Payload:
    {
      files: {
        'test/alerts.accept.js': `test('acceptAlert() example test', function (browser) {
  browser
    .navigateTo('https://nightwatchjs.org/__e2e/window/alerts.html')
    .click('#show-alert')
    .ensure.alertIsPresent('> there is an alert open')
    .pause(500)
    .acceptAlert()
    .ensure.not.alertIsPresent('', 500);
});

`,
        'README.md': `# .alerts.accept() example
`,
        'package.json': `{
  "name": "nightwatch-alerts.accept",
  "version": "0.0.0",
  "scripts": {
     "start": "nightwatch test/alerts.accept.js --env stackblitz"
  },
  "dependencies": {
    "nightwatch": "latest",
    "serve-handler": "^6.1.3",
    "chromedriver": "^103.0.0"
  }

}`,
        'nightwatch.conf.js': `
module.exports = {
  src_folders: ['test'],

  test_settings: {
    default: {
      launch_url: 'https://nightwatchjs.org',

      screenshots: {
        enabled: true,
        path: 'screens',
        on_failure: true
      },

      desiredCapabilities: {},

      webdriver: {
        start_process: true,
        host: 'localhost'
      }
    },

    stackblitz: {
      webdriver: {
        default_path_prefix: '',
        start_process: false,
        host: 'remotedriver.nightwatchjs.org',
        port: 443
      },

      globals: {
        after(done) {
          const handler = require('serve-handler');
          const http = require('http');

          const server = http.createServer((request, response) => {
            return handler(request, response, {
              public: './tests_output/nightwatch-html-report',
            });
          });

          server.listen(3000, () => {
            console.log('HTML report available at http://localhost:3000. Click on the Preview tab; make sure to enable third-party cookies for nightwatchjs.org in order to view it.');
          });
          done();
        }
      },

      desiredCapabilities: {
        browserName: 'chrome',
        'goog:chromeOptions': {}
      }
    },

    chrome: {
      desiredCapabilities: {
        browserName: 'chrome'
      }
    }
  }
};`
      },
      template: 'node',
      title: 'Nightwatch alerts.accept() example',
      description: `Try the alerts.accept() example directly in your browser.`,
    },

    // Options
    {
      clickToLoad: false,
      hideNavigation: true,
      hideExplorer:  false ,
      terminalHeight:  45 ,
      showSidebar: false,
      height:550,
      view:  'both',
      openFile: 'test/alerts.accept.js',
      view: 'editor'
      //view: (document.body.clientWidth > 1550 || navigator.userAgent.indexOf('Chrome') > 0) ? 'both' : 'editor'
    }
  );