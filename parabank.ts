import LoginPage from '../pageobjects/login.page.js'
import AccountPage from '../pageobjects/account.page.js'
import RegisterPage from '../pageobjects/register.page.js'
import { expect as expectChai } from 'chai'

import axios from 'axios';

import { browser } from '@wdio/globals'


describe('My Login application', () => {
    it('should login with valid credentials', async () => {
       
        await LoginPage.open()

        console.log('Wait for page title to be displayed');
        await LoginPage.title.waitForExist();
        
        const title = await browser.getTitle();
        expectChai(title).to.equal('ParaBank | Welcome | Online Banking');

        const userName = "shreedhar"+Date.now();
        const password = "test123"

        console.log('Click on Register')
        await RegisterPage.lnkRegister.click();

        console.log('Enter all the details and register as a new user')
        await RegisterPage.inputFirstName.setValue('shreedhar');
        await RegisterPage.inputlastName.setValue('Batthad');
        await RegisterPage.inputAddress.setValue('Banglore');
        await RegisterPage.inputCity.setValue('Banglore');
        await RegisterPage.inputState.setValue('karnataka');
        await RegisterPage.inputZipCode.setValue('560021');
        await RegisterPage.inputPhoneNumber.setValue('9113574215');
        await RegisterPage.inputSsn.setValue('0000');
        await RegisterPage.inputUsername.setValue(userName);
        await RegisterPage.inputPassword.setValue(password);
        await RegisterPage.inputConfirmPassword.setValue(password);
        await RegisterPage.btnSubmit.click();

        console.log('Validate welcome title')
        const welcomeTitle = await RegisterPage.lblWelcomeTitle.getText();   
        expectChai(welcomeTitle).to.equal('Welcome '+userName);

        console.log('Validate welcome message')
        const welcomeMessage = await RegisterPage.lblWelcomeMessage.getText();     
        expectChai(welcomeMessage).to.equal('Your account was created successfully. You are now logged in.');
        

        console.log('Navigate to the account overview and fetch the Account number');
        await AccountPage.AccountOverview.click();
        const accountNumber = await AccountPage.AccountNumber.getText();


        console.log('Deposit the amount using the POST request using API')
        const depositAmount= 10;
        let currentAvailableAmount: number = parseFloat((await AccountPage.AvailableBalance.getText()).replace("$", ""));
        console.log(currentAvailableAmount);
        const depositAmountURL = `https://parabank.parasoft.com/parabank/services/bank/deposit?accountId=${accountNumber}&amount=${depositAmount}`
        const successMessage = `Successfully deposited $${depositAmount} to account #${accountNumber}`
        await axios({ method: 'post', url: depositAmountURL }).then(async (response) => {
            console.log('Verify the response code and the message')
            expectChai(response.status).to.equal(200);
            expectChai(response.data).to.equal(successMessage);
        });

        console.log('Navigate to the account overview and click on the account number')
        await AccountPage.AccountNumber.click();

        await AccountPage.AccountOverview.click();
        let updatedAvailableAmount:number = currentAvailableAmount + depositAmount;
        currentAvailableAmount = parseFloat((await AccountPage.AvailableBalance.getText()).replace("$", ""));
        console.log('Verify if the deposited amount is displayed in the account')
        expectChai(updatedAvailableAmount.toFixed(2)).to.equal(currentAvailableAmount.toFixed(2));

        console.log('Log Off from the application');
        await LoginPage.logout();
    })
})

