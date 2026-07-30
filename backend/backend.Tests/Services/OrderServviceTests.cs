using backend.Models;
using backend.Repositories.Interfaces;
using backend.Services;
using backend.Services.Interfaces;
using Moq;
using Xunit;

namespace backend.Tests.Services;

public class OrderServiceTests
{
    // Mock dependencies
    private readonly Mock<IOrderRepository> _repository;
    private readonly Mock<IPaymentService> _paymentService;

    // Service cần test
    private readonly OrderService _service;

    public OrderServiceTests()
    {
        _repository = new Mock<IOrderRepository>();
        _paymentService = new Mock<IPaymentService>();

        _service = new OrderService(
            _repository.Object,
            _paymentService.Object);
    }

    // GetOrderByIdAsync

    [Fact]
    public async Task GetOrderByIdAsync_OrderNotFound_ShouldThrowKeyNotFoundException()
    {
        // Arrange
        _repository
            .Setup(r => r.GetByIdAsync(1))
            .ReturnsAsync((Order?)null);

        // Act & Assert
        await Assert.ThrowsAsync<KeyNotFoundException>(
            () => _service.GetOrderByIdAsync(1, 1));
    }

    [Fact]
    public async Task GetOrderByIdAsync_UserIsNotOwner_ShouldThrowUnauthorizedAccessException()
    {
        // Arrange
        _repository
            .Setup(r => r.GetByIdAsync(1))
            .ReturnsAsync(new Order
            {
                Id = 1,
                UserId = 2
            });

        // Act & Assert
        await Assert.ThrowsAsync<UnauthorizedAccessException>(
            () => _service.GetOrderByIdAsync(1, 1));
    }

    [Fact]
    public async Task GetOrderByIdAsync_OrderExistsAndUserIsOwner_ShouldReturnOrderDto()
    {
        // Arrange
        _repository
            .Setup(r => r.GetByIdAsync(1))
            .ReturnsAsync(new Order
            {
                Id = 1,
                UserId = 1
            });

        // Act
        var result = await _service.GetOrderByIdAsync(1, 1);

        // Assert
        Assert.NotNull(result);
        Assert.Equal(1, result.Id);

        // Kiểm tra Repository được gọi đúng 1 lần
        _repository.Verify(
            r => r.GetByIdAsync(1),
            Times.Once);
    }
}