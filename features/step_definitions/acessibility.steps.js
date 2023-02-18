const { Given } = require('@cucumber/cucumber');
const { chromium } = require('playwright');

const os = require('os');
const { playAudit } = require('playwright-lighthouse');
const { test } = require('@playwright/test');

Given('I run lighthouse on web-ui-playground and get the results', {timeout: 30000}, async () => {
    const context = await chromium.launchPersistentContext(os.tmpdir(), {
        args: ['--remote-debugging-port=9222'],
    });
    let pageToAudit = await context.newPage();
    await pageToAudit.goto('https://vladimirwork.github.io/web-ui-playground/');

    await playAudit({
        page: pageToAudit,
        thresholds: {
            performance: 50,
            accessibility: 50,
            'best-practices': 50,
            seo: 50,
            pwa: 0,
        },
        port: 9222,
        reports: {
            formats: {
              json: true, //defaults to false
              html: true, //defaults to false
              csv: true, //defaults to false
            },
            name: `lighthouse-report`, //defaults to `lighthouse-${new Date().getTime()}`
            directory: `lighthouse`, //defaults to `${process.cwd()}/lighthouse`
        },
    });

    await context.close();
});
