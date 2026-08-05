using backend.Controllers;
using backend.Services.Interfaces;
using backend.Tests.TestHelpers;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Moq;
using Xunit;

namespace backend.Tests.Controllers;

public class PaymentControllerTests
{
    private readonly Mock<IPaymentService> _service;
    private readonly PaymentController _controller;

    public PaymentControllerTests()
    {
        _service = new Mock<IPaymentService>();
        _controller = new PaymentController(_service.Object);
        ControllerTestHelper.SetUser(_controller, 1, "Owner");
    }

    [Fact]
    public async Task CompleteCOD_Valid_ShouldReturnOk()
    {
        var dto = new CompletePaymentDto { TransactionId = "TX123" };
        _service.Setup(s => s.CompletePayment(1, 1, "TX123")).Returns(Task.CompletedTask);

        var result = await _controller.CompleteCOD(1, dto);

        Assert.IsType<OkObjectResult>(result);
        _service.Verify(s => s.CompletePayment(1, 1, "TX123"), Times.Once);
    }

    [Fact]
    public async Task CompleteCOD_OrderNotFound_ShouldReturnNotFound()
    {
        var dto = new CompletePaymentDto { TransactionId = "TX123" };
        _service.Setup(s => s.CompletePayment(99, 1, "TX123"))
            .ThrowsAsync(new KeyNotFoundException("Order not found."));

        var result = await _controller.CompleteCOD(99, dto);

        Assert.IsType<NotFoundObjectResult>(result);
    }

    [Fact]
    public async Task CompleteCOD_AlreadyPaid_ShouldReturnConflict()
    {
        var dto = new CompletePaymentDto { TransactionId = "TX123" };
        _service.Setup(s => s.CompletePayment(1, 1, "TX123"))
            .ThrowsAsync(new InvalidOperationException("Payment already completed."));

        var result = await _controller.CompleteCOD(1, dto);

        Assert.IsType<ConflictObjectResult>(result);
    }

    [Fact]
    public async Task CompleteCOD_UnexpectedError_ShouldReturn500()
    {
        var dto = new CompletePaymentDto { TransactionId = "TX123" };
        _service.Setup(s => s.CompletePayment(1, 1, "TX123"))
            .ThrowsAsync(new Exception("boom"));

        var result = await _controller.CompleteCOD(1, dto);

        var statusResult = Assert.IsType<StatusCodeResult>(result);
        Assert.Equal(StatusCodes.Status500InternalServerError, statusResult.StatusCode);
    }
}