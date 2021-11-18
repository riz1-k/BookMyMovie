using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using System.Data.SqlClient;
using System.Data;
using BookMyMovie_Reactjs.Models;
using System.IO;
using Microsoft.AspNetCore.Hosting;

namespace BookMyMovie_Reactjs.Controllers
{
    [Route("api/admin/booked")]
    [ApiController]
    public class BookedController : Controller
    {
        private readonly IConfiguration _configuration;
        private readonly IWebHostEnvironment _env;

        public BookedController(IConfiguration configuration, IWebHostEnvironment env)
        {
            _configuration = configuration;
            _env = env;
        }
    
     [HttpGet]

        public JsonResult Get()
        {
            string query = @"
                    select * from dbo.Booked";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("MovieAppConnection");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult(table);
        }
        [HttpPost]
        public JsonResult Post(Booked boo)
        {
            string query = @"
                    insert into dbo.Booked (MovieName,Cinema,ShowData,ShowTime,UserName,UserEmail)
                    values
                    (
                    '" + boo.MovieName + @"'
                    ,'" + boo.Cinema + @"'
                    ,'" + boo.ShowData + @"'
                    ,'" + boo.ShowTime + @"'
                    ,'" + boo.UserName + @"'
                    ,'" + boo.UserEmail + @"'
                    )";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("MovieAppConnection");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult("Added Successfully!");
        }
        [HttpDelete("{id}")]
        public JsonResult Delete(int id)
        {
            string query = @"
                    delete from dbo.Booked
                    where BookedId=" + id + @"
                    ";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("MovieAppConnection");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult("Deleted Successfully!");
        }
        [HttpPut]
        public JsonResult Put(Booked boo)
        {
            string query = @"
                   update dbo.Booked set
                    UserName = '" + boo.UserName + @"'
                    ,UserEmail = '" + boo.UserEmail + @"'
                    where BookedId= '" + boo.BookedId + @"'
                    ";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("MovieAppConnection");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult("Gift has been sent Successfully!");
        }
    }
}