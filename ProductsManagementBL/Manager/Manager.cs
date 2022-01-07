using Microsoft.AspNetCore.Http;
using Newtonsoft.Json.Linq;
using ProductManagementDA.Repository;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;

namespace ProductsManagementBL.Manager
{
    public class Manager<TEntity, TRepository> : IManager<TEntity> where TEntity : class
        where TRepository : IRepository<TEntity>
    {
        private readonly TRepository _repository;

        public Manager(TRepository repository)
        {
            _repository = repository;
        }

        public async Task<ICollection<TEntity>> Get(HttpRequest request = null)
        {
            var body = request != null ? await new StreamReader(request?.Body).ReadToEndAsync() : null;
            if (!string.IsNullOrEmpty(body))
            {
                string[] includes = JArray.Parse(body).ToObject<string[]>();
                if (includes != null)
                {
                    return await _repository.GetAll(includes);
                }
            }

            return await _repository.GetAll();
        }

        public async Task<ICollection<TEntity>> GetWithPaging(int pageNo, int pageSize, HttpRequest request = null)
        {
            var body = request != null ? await new StreamReader(request?.Body).ReadToEndAsync() : null;
            if (!string.IsNullOrEmpty(body))
            {
                string[] includes = JArray.Parse(body).ToObject<string[]>();
                if (includes != null)
                {
                    return await _repository.GetAllWithPaging(pageNo, pageSize, includes);
                }
            }

            return await _repository.GetAllWithPaging(pageNo, pageSize);
        }

        public async Task<TEntity> GetById(int id, HttpRequest request = null)
        {
            var body = request != null ? await new StreamReader(request?.Body).ReadToEndAsync() : null;
            if (!string.IsNullOrEmpty(body))
            {
                string[] includes = JArray.Parse(body).ToObject<string[]>();
                if (includes != null)
                {
                    return await _repository.Get(id, includes);
                }
            }

            return await _repository.Get(id);
        }

        public async Task<TEntity> Update(int id, TEntity entity)
        {
            return await _repository.Update(id, entity);
        }

        public async Task<TEntity> Add(TEntity entity)
        {
            return await _repository.Add(entity);
        }
    }
}
