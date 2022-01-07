using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProductManagementDA.Repository
{
    public class Repository<TEntity, TContext> : IRepository<TEntity> where TEntity : class
        where TContext : DatabaseContext
    {
        private readonly TContext _context;
        private readonly DbSet<TEntity> _dbSet;

        public Repository(TContext context)
        {
            _context = context;
            _dbSet = context.Set<TEntity>();

        }

        public async Task<TEntity> Add(TEntity entity)
        {
            _context.Set<TEntity>().Add(entity);
            await _context.SaveChangesAsync();
            return entity;
        }

        public async Task<ICollection<TEntity>> GetAll(string[] includes = null)
        {
            _context.ChangeTracker.QueryTrackingBehavior = QueryTrackingBehavior.NoTracking;
            if (includes == null)
            {
                return await _dbSet.ToListAsync();
            }
            else
            {
                ICollection<TEntity> response = new List<TEntity>();
                foreach (var item in includes)
                {
                    foreach (var r in response)
                    {
                        AddIncludes(item, r);
                    }
                }

                return response;
            }
        }

        public async Task<ICollection<TEntity>> GetAllWithPaging(int pageNo, int pageSize, string[] includes = null)
        {
            _context.ChangeTracker.QueryTrackingBehavior = QueryTrackingBehavior.NoTracking;
            if (includes == null)
            {
                return await _dbSet.Skip(pageSize * (pageNo - 1)).Take(pageSize).ToListAsync();
            }
            else
            {
                ICollection<TEntity> response = new List<TEntity>();
                foreach (var item in includes)
                {
                    foreach (var r in response)
                    {
                        AddIncludes(item, r);
                    }
                }

                return response;
            }
        }

        public async Task<TEntity> Get(int id, string[] includes = null)
        {
            _context.ChangeTracker.QueryTrackingBehavior = QueryTrackingBehavior.NoTracking;
            if (includes == null)
            {
                return await _dbSet.FindAsync(id);
            }
            else
            {
                TEntity response = await _dbSet.FindAsync(id);
                foreach (var item in includes)
                {
                    AddIncludes(item, response);
                }

                return response;
            }
        }

        public async Task<TEntity> Update(int id, TEntity entity)
        {
            //entity.ModifiedDate = DateTime.Now;
            _context.ChangeTracker.QueryTrackingBehavior = QueryTrackingBehavior.NoTracking;
            TEntity updateEntity = await _dbSet.FindAsync(id);
            _context.Entry(updateEntity).CurrentValues.SetValues(entity);
            await _context.SaveChangesAsync();
            return updateEntity;
        }


        private void AddIncludes(string item, TEntity r)
        {
            if (_context.Entry(r).References.Any(m => m.Metadata.Name.ToLower() == item.ToLower()))
            {
                _context.Entry(r).Reference(item).Load();
            }
            else if (_context.Entry(r).Collections.Any(m => m.Metadata.Name.ToLower() == item.ToLower()))
            {
                _context.Entry(r).Collection(item).Load();
            }
        }



    }
}
