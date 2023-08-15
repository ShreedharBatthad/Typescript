import { $ } from '@wdio/globals'

/**
 * sub page containing specific selectors and methods for a specific page
 */
class RegisterPage  {
    /**
     * define selectors using getter methods
     */
     get lnkRegister() {
        return $('//a[text()="Register"]');
    }
    
    get inputFirstName()
    {
        return $('[id="customer.firstName"]');
    }

    get inputlastName()
    {
        return $('[id="customer.lastName"]');
    }

    get inputAddress()
    {
        return $('[id="customer.address.street"]');
    }

    get inputCity()
    {
        return $('[id="customer.address.city"]');
    }

    get inputState()
    {
        return $('[id="customer.address.state"]');
    }

    get inputZipCode()
    {
        return $('[id="customer.address.zipCode"]');
    }

    get inputPhoneNumber()
    {
        return $('[id="customer.phoneNumber"]');
    }

    get inputSsn()
    {
        return $('[id="customer.ssn"]');
    }

    get inputUsername()
    {
        return $('[id="customer.username"]');
    }

    get inputPassword()
    {
        return $('[id="customer.password"]');
    }  

    get inputConfirmPassword()
    {
        return $('#repeatedPassword');
    }

    get btnSubmit()
    {
        return $('input[value="Register"]');
    }

    get lblWelcomeTitle()
    {
        return $('#rightPanel h1');
    }
    
    get lblWelcomeMessage()
    {
        return $('#rightPanel p');
    }
}

export default new RegisterPage();
