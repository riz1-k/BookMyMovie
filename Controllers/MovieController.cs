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
    [Route("api/admin/movies")]
    [ApiController]
    public class MovieController : Controller
    {
        private readonly IConfiguration _configuration;
        private readonly IWebHostEnvironment _env;

        public MovieController(IConfiguration configuration, IWebHostEnvironment env)
        {
            _configuration = configuration;
            _env = env;
        }
        [HttpGet]

        public JsonResult Get()
        {
            string query = @"
                    select * from dbo.Movies";
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

        [HttpGet("{id}")]

        public JsonResult Get(int id)
        {
            string query = @"
                    select * from dbo.Movies where MovieId="+id+@"
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
            return new JsonResult(table);
        }


        [HttpPost]
        public JsonResult Post(Movies mov)
        {
            string query = @"
                    insert into dbo.Movies (MovieName,Category,Cinema,ShowDate,ShowTiming,PosterFileName,Rating,Summary,Price)
                    values
                    (
                    '" + mov.MovieName + @"'
                    ,'" + mov.Category + @"'
                    ,'" + mov.Cinema + @"'
                    ,'" + mov.ShowDate + @"'
                    ,'" + mov.ShowTiming + @"'
                    ,'" + mov.PosterFileName + @"'
                    ,'" + mov.Rating + @"'
                    ,'" + mov.Summary + @"'
                    ,'" + mov.Price + @"'
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
        public JsonResult Put(Movies mov)
        {
            string query = @"
                   update dbo.Movies set
                    MovieName = '" + mov.MovieName + @"'
                    ,Category = '" + mov.Category + @"'
                    ,Cinema = '" + mov.Cinema+ @"'
                    ,ShowDate = '" + mov.ShowDate + @"'
                    ,ShowTiming = '" + mov.ShowTiming+ @"'
                    ,PosterFileName = '" + mov.PosterFileName + @"'
                    ,Rating = '" + mov.Rating + @"'
                    ,Summary = '" + mov.Summary + @"'
                    ,Price = '" + mov.Price + @"'
                    where MovieId = '" + mov.MovieId + @"'
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
                    delete from dbo.Movies 
                    where MovieId=" + id + @"
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

        [Route("SaveFile")]
        [HttpPost]

        public JsonResult SaveFile()
        {
            try
            {
                var httpRequest = Request.Form;
                var postedFile = httpRequest.Files[0];
                string filename = postedFile.FileName;
                var physicalPath = _env.ContentRootPath + "/Photos/" + filename;

                using (var stream = new FileStream(physicalPath, FileMode.Create))
                {
                    postedFile.CopyTo(stream);
                }
                return new JsonResult(filename);
            }
            catch (Exception)
            {
                return new JsonResult("anonymous.jpg");
            }
        }
        [Route("GetAllCategoryNames")]

        public JsonResult GetAllCategoryNames()
        {
            string query = @"
                                select CategoryName from Category
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
            return new JsonResult(table);
        }
    }
}