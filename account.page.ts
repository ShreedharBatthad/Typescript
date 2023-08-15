import { $ } from '@wdio/globals'

/**
 * sub page containing specific selectors and methods for a specific page
 */
class AccountPage  {
    /**
     * define selectors using getter methods
     */
    get AccountNumber () {
        return $('a[href*="activity.htm?id"]');
    }

    get AvailableBalance () {
        return $('//tr[@ng-repeat="account in accounts"]//td[last()]');
    }

    get AccountOverview() {
        return $('a[href="/parabank/overview.htm"]');
    }
    
    get TransferFunds() {
        return $('a[href="/parabank/transfer.htm"]');
    }

    get txtAmount() {
        return $('#amount');
    }

    get btnTransfer() {
        return $('input[value="Transfer"]');
    }
}

export default new AccountPage();
