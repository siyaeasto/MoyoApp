using Microsoft.AspNetCore.Http;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ProductsManagementBL.Manager
{
    public interface IManager<TEntity> where TEntity : class
    {
        Task<TEntity> Add(TEntity entity);
        Task<ICollection<TEntity>> Get(HttpRequest request = null);
        Task<TEntity> GetById(int id, HttpRequest request = null);
        Task<ICollection<TEntity>> GetWithPaging(int pageNo, int pageSize, HttpRequest request = null);
        Task<TEntity> Update(int id, TEntity entity);
    }
}