module.exports = {
    fillOutFormData: async function (page, data) {
      await page.fill('input[name="FirstName"]', data.FirstName);
      await page.fill('input[name="LastName"]', data.LastName);
      await page.fill('input[name="Email"]', data.Email);
      await page.fill('input[name="PhoneNumber"]', data.PhoneNumber);
      await page.check(`input[type="radio"][value="${data.Gender}"]`);
      await page.check('input[type="checkbox"][name="Agreement"]');
    }
  };
  