$(document).ready(function() {
    $.ajax({
        url: 'App/Application/check_session.php',
        method: 'GET',
        success: function(response) {
            if (response.trim() === 'loggedin') {
                $('#adminName').text('Admin');
            } else {
                window.location.href = 'admin.html';
            }
        }
    });

    // Загрузка заказов
    loadOrders();

    function loadOrders() {
        $.ajax({
            url: 'App/Presentation/get_orders.php',
            method: 'GET',
            success: function(response) {
                $('#ordersTableBody').html(response);
            }
        });
    }

    // Загрузка статистики
    loadStatistics();

    function loadStatistics() {
        $.ajax({
            url: 'App/Presentation/get_statistics.php',
            method: 'GET',
            success: function(response) {
                var data = JSON.parse(response);
                var labels = data.map(function(item) {
                    return item.date;
                });
                var counts = data.map(function(item) {
                    return item.count;
                });

                var ctx = document.getElementById('ordersChart').getContext('2d');
                new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: labels,
                        datasets: [{
                            label: 'Количество заказов по дням',
                            data: counts,
                            borderColor: 'rgba(75, 192, 192, 1)',
                            backgroundColor: 'rgba(75, 192, 192, 0.2)',
                            borderWidth: 1
                        }]
                    },
                    options: {
                        scales: {
                            x: {
                                beginAtZero: true
                            },
                            y: {
                                beginAtZero: true
                            }
                        }
                    }
                });
            }
        });
    }

    // Загрузка всех товаров
    loadItems();

    function loadItems() {
        $.ajax({
            url: 'App/Presentation/get_items.php',
            method: 'GET',
            success: function(response) {
                var data = JSON.parse(response);
                var itemsTableBody = $('#itemsTableBody');
                itemsTableBody.empty();

                data.forEach(function(item) {
                    itemsTableBody.append(
                        `<tr data-id="${item.id}">
                            <td>${item.id}</td>
                            <td class="item-name">${item.name}</td>
                            <td class="item-price">${item.price}</td>
                            <td>
                                <button class="btn btn-warning btn-sm edit-item" data-id="${item.id}">
                                    <i class="fas fa-pencil-alt"></i>
                                </button>
                                <button class="btn btn-danger btn-sm delete-item" data-id="${item.id}">
                                    <i class="fas fa-trash-alt"></i>
                                </button>
                            </td>
                        </tr>`
                    );
                });

                // Обработчики кнопок редактирования и удаления
                $('.edit-item').click(function() {
                    var itemId = $(this).data('id');
                    var row = $(this).closest('tr');
                    var name = row.find('.item-name').text();
                    var price = row.find('.item-price').text();

                    row.find('.item-name').html(`<input type="text" class="form-control item-name-edit" value="${name}">`);
                    row.find('.item-price').html(`<input type="number" class="form-control item-price-edit" value="${price}" step="0.01">`);
                    $(this).replaceWith('<button class="btn btn-success btn-sm save-item" data-id="' + itemId + '"><i class="fas fa-check"></i></button>');
                });

                $(document).on('click', '.save-item', function() {
                    var itemId = $(this).data('id');
                    var row = $(this).closest('tr');
                    var newName = row.find('.item-name-edit').val();
                    var newPrice = row.find('.item-price-edit').val();

                    $.ajax({
                        url: 'App/Presentation/update_item.php',
                        method: 'POST',
                        data: {
                            id: itemId,
                            name: newName,
                            price: newPrice
                        },
                        success: function(response) {
                            if (response === 'success') {
                                loadItems(); 
                                alert('Товар успешно изменен');
                            } else {
                                alert('Ошибка при изменении товара');
                            }
                        }
                    });
                });

                $('.delete-item').click(function() {
                    var itemId = $(this).data('id');

                    if (confirm('Вы точно хотите удалить товар?')) {
                        $.ajax({
                            url: 'App/Application/delete_item.php',
                            method: 'POST',
                            data: { id: itemId },
                            success: function(response) {
                                if (response === 'success') {
                                    loadItems(); 
                                } else {
                                    alert('Ошибка при удалении товара');
                                }
                            }
                        });
                    }
                });
            }
        });
    }

    // Обработка добавления нового товара
    $('#addItemButton').click(function() {
        $('#addItemForm').toggle(); 
    });

    $('#newItemForm').submit(function(e) {
        e.preventDefault();
        $.ajax({
            url: 'App/Presentation/add_item.php',
            method: 'POST',
            data: $(this).serialize(),
            success: function(response) {
                if (response === 'success') {
                    loadItems(); 
                    $('#addItemForm').hide();
                } else {
                    alert('Ошибка при добавлении товара');
                }
            }
        });
    });

    $('#cancelAddItem').click(function() {
        $('#addItemForm').hide(); 
    });

    // Обработка выхода из админки
    $('#logoutButton').click(function() {
        $.ajax({
            url: 'App/Application/logout.php',
            method: 'POST',
            success: function() {
                window.location.href = 'admin.html';
            }
        });
    });

    // Управление отображением секций
    $('#sidebar .nav-link').click(function(e) {
        e.preventDefault();
        var target = $(this).data('target');
        $('.section').hide(); 
        $('#' + target).show();
        $('#sidebar .nav-link').removeClass('active'); 
        $(this).addClass('active'); 
    });
});




$(document).ready(function() {
    $('#searchItem').on('keyup', function() {
        var value = $(this).val().toLowerCase();
        $('#itemsTableBody tr').filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
        });
    });
});




$(document).ready(function() {
    loadItemsStatistics();

    function loadItemsStatistics() {
        $.ajax({
            url: 'App/Presentation/get_items_statistics.php',
            method: 'GET',
            success: function(response) {
                var data = JSON.parse(response);

                var labels = data.map(function(item) {
                    return item.name; 
                });
                var counts = data.map(function(item) {
                    return item.rentals; 
                });

                var ctx = document.getElementById('itemsChart').getContext('2d');
                new Chart(ctx, {
                    type: 'pie', 
                    data: {
                        labels: labels,
                        datasets: [{
                            label: 'Количество заказов',
                            data: counts,
                            backgroundColor: [
                                'rgba(75, 192, 192, 0.5)',
                                'rgba(153, 102, 255, 0.5)',
                                'rgba(255, 159, 64, 0.5)',
                                'rgba(255, 99, 132, 0.5)',
                                'rgba(54, 162, 235, 0.5)',
                            ],
                            borderColor: [
                                'rgba(75, 192, 192, 1)',
                                'rgba(153, 102, 255, 1)',
                                'rgba(255, 159, 64, 1)',
                                'rgba(255, 99, 132, 1)',
                                'rgba(54, 162, 235, 1)',
                            ],
                            borderWidth: 1
                        }]
                    },
                    options: {
                        responsive: true,
                        plugins: {
                            legend: {
                                position: 'top',
                            },
                            title: {
                                display: true,
                                text: 'Частота заказов по товарам'
                            }
                        }
                    }
                });
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.error('Ошибка загрузки статистики:', textStatus, errorThrown);
                console.error('Ответ:', jqXHR.responseText);
            }
        });
    }
});


