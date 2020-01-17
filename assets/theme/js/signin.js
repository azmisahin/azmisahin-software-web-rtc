/**
 * Azmi ŞAHİN Web RTC
 *
 * Web Real-Time Communications.
 * 
 * https://github.com/azmisahin/azmisahin-software-web-rtc
 *
 * @author Azmi SAHIN
 * @since 2020
 * */
function Authentication() { }

/**
 * Authentication Sign In
 */
Authentication.prototype.SignIn = function (form, input) {

    // Form submit
    $(form).submit(function (e) {

        // prevents page reloading
        e.preventDefault();

        // Get user
        var user = $("#" + input).val();

        // Action
        $.cookie("user", user);
        window.location.href = "app";

        return false;
    });
}