using System;
using System.ComponentModel.DataAnnotations;

namespace ProductManagementDA.Models.Data
{
    public class Product
    {
        [Required]
        [Key]
        public int ProductId { get; set; }
        [Required]
        public string Name { get; set; }
        public string ProductDesciption { get; set; }
        [Required]
        public ProductStatus ProductStatus { get; set; }
        [Required]
        public string CreatedBy { get; set; }
        [Required]
        public DateTime CreatedDate { get; set; }
        public string ModifiedBy { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public string ApprovedBy { get; set; }
        public DateTime? ApprovedDate { get; set; }
        public bool Enabled { get; set; }
        public int Quantity { get; set; }
    }
}
