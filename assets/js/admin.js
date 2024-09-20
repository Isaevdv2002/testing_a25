$(document).ready(function() {
    $('#loginForm').submit(function(e) {
        e.preventDefault();

        var username = $('#username').val();
        var password = $('#password').val();

        $.ajax({
            url: 'App/Application/login.php',
            method: 'POST',
            data: {
                username: username,
                password: password
            },
            success: function(response) {
                if (response.trim() === 'success') {
                    window.location.href = 'admin_dashboard.html';
                } else {
                    $('#loginMessage').text('Неверный логин или пароль').css('color', 'red');
                }
            }
        });
    });
});
