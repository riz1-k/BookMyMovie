using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookMyMovie_Reactjs.Models
{
    public class Movies
    {
        public int MovieId { get; set; }
        public string MovieName { get; set; }
        public string Category { get; set; }
        public string PosterFileName { get; set; }
        public float Rating { get; set; }
        public string ReleaseDate { get; set; }
        public string Trailer{get;set;}
        public string Summary { get; set; }
    }
}
