$(document).ready(function() {
    $.ajax({
        url: 'App/Presentation/get_items.php',
        method: 'GET',
        success: function(response) {
            var products = JSON.parse(response);
            var $productSelect = $('#product');

            $productSelect.empty(); 

            products.forEach(function(product) {
                $productSelect.append('<option value="' + product.id + '">' + product.name + '</option>');
            });
        },
        error: function(xhr, status, error) {
            console.error('Ошибка загрузки товаров:', xhr.status, error);
        }
    });

    $("#startDate").datepicker({
        dateFormat: "yy-mm-dd",
        minDate: 0
    });

    $("#endDate").datepicker({
        dateFormat: "yy-mm-dd",
        minDate: 1
    });

    $('#phone').mask('+7 (999) 999-9999');

    $('[data-toggle="tooltip"]').tooltip();

    $('#calculateButton').click(function() {
        calculatePrice();
    });

    function calculatePrice() {
        var productId = $('#product').val();
        var startDate = $('#startDate').val();
        var endDate = $('#endDate').val();

        if (startDate && endDate) {
            $.ajax({
                url: 'App/Application/calculate.php',
                method: 'POST',
                data: {
                    productId: productId,
                    startDate: startDate,
                    endDate: endDate
                },
                success: function(response) {
                    try {
                        var data = JSON.parse(response);
                        $('#totalPriceRUB').text(data.priceRUB);
                        $('#totalPriceCNY').text(data.priceCNY);
                        $('#requestButton').show();
                    } catch (e) {
                        console.error('Ошибка обработки данных:', e);
                    }
                },
                error: function(xhr, status, error) {
                    console.error('Ошибка расчёта стоимости:', xhr.status, error);
                }
            });
        } else {
            console.error('Не выбраны даты или товар');
        }
    }

    $('#requestButton').click(function() {
        $('#requestModal').modal('show');
    });

    $('#requestForm').submit(function(e) {
        e.preventDefault();

        var name = $('#name').val();
        var email = $('#email').val();
        var phone = $('#phone').val();
        var productId = $('#product').val();
        var startDate = $('#startDate').val();
        var endDate = $('#endDate').val();
        var totalPrice = $('#totalPriceRUB').text();

        $.ajax({
            url: 'App/Domain/sendRequest.php',
            method: 'POST',
            data: {
                name: name,
                email: email,
                phone: phone,
                productId: productId,
                startDate: startDate,
                endDate: endDate,
                totalPrice: totalPrice
            },
            success: function(response) {
                alert('Ваша заявка отправлена.');
                $('#requestModal').modal('hide');
                $('#requestForm')[0].reset();
                $('#requestButton').hide();
            },
            error: function(xhr, status, error) {
                console.error('Ошибка отправки заявки:', xhr.status, error);
            }
        });
    });
});

    $(document).ready(function() {
        $.ajax({
            url: 'App/Presentation/get_items.php',
            method: 'GET',
            dataType: 'json',
            success: function(data) {
                var fleetItemsContainer = $('#fleet-items');
                fleetItemsContainer.empty(); 

                $.each(data, function(index, item) {
                    var fleetItem = '<div class="fleet-item">' +
                        '<i class="fas fa-rocket"></i>' +
                        '<h3>' + item.name + '</h3>' +
                        '<p>Цена: ' + item.price + ' кредитов/час</p>' +
                        '</div>';

                    fleetItemsContainer.append(fleetItem);
                });
            },
            error: function() {
                console.log('Ошибка при загрузке данных');
            }
        });
    });