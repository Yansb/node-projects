import axios from "axios"

describe("api test", () => {
  it('should test API', async () => {
    await axios({
      url: "http://localhost:3000/checkin",
      method: "POST",
      data: {
        plate: "ABC-123",
        checkinDate: "2022-01-01:10:00:00-03:00",
      }
    }, )
    const responseGetParkedCars = await axios({
      url: "http://localhost:3000/parked_cars",
      method: "GET",
    })
    const parkedCars = responseGetParkedCars.data;
    expect(parkedCars).toHaveLength(1);
    const responseCheckout = await axios({
      url: "http://localhost:3000/checkout",
      method: "POST",
      data: {
        plate: "ABC-123",
        checkoutDate: "2022-01-01:12:00:00-03:00",
      }
    })
    const ticket = responseCheckout.data;
    expect(ticket.period).toBe(2)
    expect(ticket.price).toBe(20)
  })
  
})