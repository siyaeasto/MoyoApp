using System.Collections.Generic;
using System.Threading.Tasks;

namespace ProductManagementDA.Repository
{
    public interface IRepository<TEntity> where TEntity : class
    {
        Task<TEntity> Add(TEntity entity);
        Task<TEntity> Get(int id, string[] includes = null);
        Task<ICollection<TEntity>> GetAll(string[] includes = null);
        Task<ICollection<TEntity>> GetAllWithPaging(int pageNo, int pageSize, string[] includes = null);
        Task<TEntity> Update(int id, TEntity entity);
    }
}