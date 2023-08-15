import { $ } from '@wdio/globals'

/**
 * sub page containing specific selectors and methods for a specific page
 */
class LoginPage  {
    /**
     * define selectors using getter methods
     */
    get inputUsername () {
        return $('input[name="username"]');
    }

    get inputPassword () {
        return $('input[name="password"]');
    }

    get btnSubmit () {
        return $('input[type="submit"]');
    }

    get title () {
        return $('//title[text()="ParaBank | Welcome | Online Banking"]');
    }

    get lnkLogout(){
        return $('a[href="/parabank/logout.htm"]');
    }
    /**
     * a method to encapsule automation code to interact with the page
     * e.g. to login using username and password
     */
    async login (username: string, password: string) {
        await this.inputUsername.setValue(username);
        await this.inputPassword.setValue(password);
        await this.btnSubmit.click();
    }

    async logout(){
        await this.lnkLogout.click();
        await this.inputUsername.waitForDisplayed();
    }
    /**
     * overwrite specific options to adapt it to page object
     */
    open () {
        console.log('Launch the browser');
        console.log('Open the application URL');
        return browser.url('/parabank/index.htm');
    }
}

export default new LoginPage();


