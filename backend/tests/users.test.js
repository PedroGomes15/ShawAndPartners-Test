import { users } from "../Controller/users";

const csvData = [
  {
    name: "John Doe",
    city: "New York",
    country: "USA",
    favorite_sport: "Basketball",
  },
  {
    name: "Jane Smith",
    city: "London",
    country: "UK",
    favorite_sport: "Football",
  },
  {
    name: "Mike Johnson",
    city: "Paris",
    country: "France",
    favorite_sport: "Tennis",
  },
];

describe("users", () => {
  // Tests that the function returns filtered data when a valid search term is provided
  it("should return filtered data when a valid search term is provided", async () => {
    const req = { query: { q: "USA" } };
    const res = { json: jest.fn() };
    await users(req, res, csvData);
    expect(res.json).toHaveBeenCalledWith({
      data: [
        {
          name: "John Doe",
          city: "New York",
          country: "USA",
          favorite_sport: "Basketball",
        },
      ],
    });
  });

  // Tests that the function returns a 400 error when an empty search term is provided
  it("should return a 400 error when an empty search term is provided", async () => {
    const req = { query: { q: "" } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    await users(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: "No search term provided" });
  });
});
