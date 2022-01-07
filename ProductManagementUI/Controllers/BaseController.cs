using Microsoft.AspNetCore.Mvc;
using ProductsManagementBL.Manager;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ProductManagementUI.Controllers
{
    public class BaseController<TEntity, TManager>: ControllerBase
        where TEntity: class
        where TManager: IManager<TEntity>
    {
        private readonly TManager _manager;
        public BaseController(TManager manager) {
            _manager = manager;
        }

        internal async Task<ICollection<TEntity>> Read() {
            return await _manager.Get(Request);
        }

        internal async Task<TEntity> ReadById(int id)
        {
            return await _manager.GetById(id, Request);
        }
        
        internal async Task<ICollection<TEntity>> ReadWithPaging(int pageNo, int pageSize)
        {
            return await _manager.GetWithPaging(pageNo, pageSize, Request);
        }

        internal async Task<TEntity> Edit(int id, TEntity entity)
        {
            return await _manager.Update(id, entity);
        }

        internal async Task<TEntity> Create( TEntity entity)
        {
            return await _manager.Add(entity);
        }
    }
}
