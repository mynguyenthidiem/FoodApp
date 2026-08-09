using backend.Data;
using backend.Models;
using backend.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace backend.Repositories
{
    public class FavoriteRepository : IFavoriteRepository
    {
        private readonly AppDbContext _context;

        public FavoriteRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<bool> IsFoodFavoritedAsync(int userId, int foodId)
        {
            return await _context.FavoriteFoods
                .AnyAsync(ff => ff.UserId == userId && ff.FoodId == foodId);
        }

        public async Task AddFoodFavoriteAsync(FavoriteFood favorite)
        {
            _context.FavoriteFoods.Add(favorite);
            await _context.SaveChangesAsync();
        }

        public async Task<bool> RemoveFoodFavoriteAsync(int userId, int foodId)
        {
            var favorite = await _context.FavoriteFoods
                .FirstOrDefaultAsync(ff => ff.UserId == userId && ff.FoodId == foodId);

            if (favorite == null)
            {
                return false;
            }

            _context.FavoriteFoods.Remove(favorite);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<(List<Food> Items, int TotalCount)> GetFavoriteFoodsAsync(int userId, int pageNumber, int pageSize)
        {
            var query = _context.FavoriteFoods
                .Where(ff => ff.UserId == userId)
                .OrderByDescending(ff => ff.CreatedAt)
                .Select(ff => ff.Food)
                .Include(f => f.Category)
                    .ThenInclude(c => c.SystemCategory)
                .Include(f => f.Restaurant)
                .AsNoTracking();

            var totalCount = await query.CountAsync();
            var items = await query.Skip((pageNumber - 1) * pageSize)
                                    .Take(pageSize)
                                    .ToListAsync();
            return (items, totalCount);
        }

        public async Task<bool> IsRestaurantFavoritedAsync(int userId, int restaurantId)
        {
            return await _context.FavoriteRestaurants
                .AnyAsync(fr => fr.UserId == userId && fr.RestaurantId == restaurantId);
        }

        public async Task AddRestaurantFavoriteAsync(FavoriteRestaurant favorite)
        {
            _context.FavoriteRestaurants.Add(favorite);
            await _context.SaveChangesAsync();
        }

        public async Task<bool> RemoveRestaurantFavoriteAsync(int userId, int restaurantId)
        {
            var favorite = await _context.FavoriteRestaurants
                .FirstOrDefaultAsync(fr => fr.UserId == userId && fr.RestaurantId == restaurantId);

            if (favorite == null)
            {
                return false;
            }

            _context.FavoriteRestaurants.Remove(favorite);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<(List<Restaurant> Items, int TotalCount)> GetFavoriteRestaurantsAsync(int userId, int pageNumber, int pageSize)
        {
            var query = _context.FavoriteRestaurants
                .Where(fr => fr.UserId == userId)
                .OrderByDescending(fr => fr.CreatedAt)
                .Select(fr => fr.Restaurant)
                .Include(r => r.Foods.Where(f => f.Status == FoodStatus.Available))
                .Include(r => r.Categories.Where(c => c.IsActive))
                    .ThenInclude(c => c.SystemCategory)
                .AsNoTracking();

            var totalCount = await query.CountAsync();
            var items = await query.Skip((pageNumber - 1) * pageSize)
                                    .Take(pageSize)
                                    .ToListAsync();
            return (items, totalCount);
        }
    }
}
