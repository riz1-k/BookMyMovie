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

namespace BookMyMovie_Reactjs.Controllers
{
    [Route("api/admin/cinemas")]
    [ApiController]
    public class CinemaController : Controller
    {
        private readonly IConfiguration _configuration;

        public CinemaController(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        [HttpGet]

        public JsonResult Get()
        {
            string query = @"select * from dbo.Cinema";
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
        public JsonResult Post(Cinema cin)
        {
            string query = @"
                    insert into dbo.Cinema (CinemaName,CinemaAddress) values
                   (
                    '" + cin.CinemaName+ @"'
                    ,'" + cin.CinemaAddress + @"'
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
        [HttpPut]
        public JsonResult Put(Cinema cin)
        {
            string query = @"
                   update dbo.Cinema set
                    CinemaName = '" + cin.CinemaName+ @"',
                    CinemaAddress = '" + cin.CinemaAddress+ @"'
                    where CinemaId = '" + cin.CinemaId+ @"'
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
            return new JsonResult("Updated Successfully!");
        }
        [HttpDelete("{id}")]
        public JsonResult Delete(int id)
        {
            string query = @"
                    delete from dbo.Cinema 
                    where CinemaId=" + id + @"
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
    }
}
