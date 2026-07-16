using FEHNA.Models;

namespace FEHNA.Data;

public static class SeedData
{
    public static void Initialize(FehnaDbContext db)
    {
        if (db.News.Any()) return;

        db.News.AddRange(
            new NewsItem { Id = 1, Title = "Honduras domina en los Juegos Centroamericanos de Natación 2025", Excerpt = "La delegación hondureña obtuvo 12 medallas de oro en la edición más competida de los Juegos Centroamericanos celebrada en Ciudad de Guatemala.", Category = "Campeonato", Date = new DateTime(2025, 7, 10), ImageUrl = "https://images.unsplash.com/photo-1530549387789-4c1017266635?w=800&h=500&fit=crop&auto=format", Featured = true },
            new NewsItem { Id = 2, Title = "Karla Mendoza rompe récord nacional en 100m mariposa", Excerpt = "Con un tiempo de 57.43 segundos, la nadadora capitalina establece una nueva marca histórica para el país.", Category = "Resultados", Date = new DateTime(2025, 7, 5), ImageUrl = "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=500&fit=crop&auto=format", Featured = false },
            new NewsItem { Id = 3, Title = "Convocatoria oficial para el Campeonato Panamericano de Lima", Excerpt = "La Fenah anuncia los 24 atletas seleccionados para representar a Honduras en el torneo continental de agosto.", Category = "Selección", Date = new DateTime(2025, 7, 1), ImageUrl = "https://images.unsplash.com/photo-1544551763-92ab472cad5d?w=800&h=500&fit=crop&auto=format", Featured = false },
            new NewsItem { Id = 4, Title = "Equipo masculino de waterpolo clasifica al Regional UANA", Excerpt = "Con cuatro victorias consecutivas, Los Tiburones de Honduras consiguen su pase al torneo regional de la UANA.", Category = "Waterpolo", Date = new DateTime(2025, 6, 28), ImageUrl = "https://images.unsplash.com/photo-1618019852954-af0a02f40fd0?w=800&h=500&fit=crop&auto=format", Featured = false }
        );

        db.Events.AddRange(
            new EventItem { Id = 1, Title = "Campeonato Nacional Juvenil", DateDisplay = "20 Jul", Month = "JUL", Location = "Tegucigalpa", Discipline = "Natación", Type = "Nacional", Level = "Juvenil" },
            new EventItem { Id = 2, Title = "Copa Honduras Open", DateDisplay = "2 Ago", Month = "AGO", Location = "San Pedro Sula", Discipline = "Natación", Type = "Nacional", Level = "Absoluta" },
            new EventItem { Id = 3, Title = "Panamericano Corta Distancia", DateDisplay = "14 Ago", Month = "AGO", Location = "Lima, Perú", Discipline = "Natación", Type = "Internacional", Level = "Absoluta" },
            new EventItem { Id = 4, Title = "Torneo Regional de Clavados", DateDisplay = "21 Ago", Month = "AGO", Location = "Ciudad de Guatemala", Discipline = "Clavados", Type = "Internacional", Level = "Juvenil" },
            new EventItem { Id = 5, Title = "Liga Nacional de Waterpolo", DateDisplay = "5 Sep", Month = "SEP", Location = "Comayagüela", Discipline = "Waterpolo", Type = "Nacional", Level = "Absoluta" },
            new EventItem { Id = 6, Title = "Campeonato Centroamericano Sincronizado", DateDisplay = "18 Sep", Month = "SEP", Location = "San José, Costa Rica", Discipline = "Sincronizado", Type = "Internacional", Level = "Absoluta" },
            new EventItem { Id = 7, Title = "Clasificatorio Olímpico UANA", DateDisplay = "3 Oct", Month = "OCT", Location = "Montevideo, Uruguay", Discipline = "Natación", Type = "Internacional", Level = "Absoluta" },
            new EventItem { Id = 8, Title = "Campeonato Nacional Infantil", DateDisplay = "15 Oct", Month = "OCT", Location = "La Ceiba", Discipline = "Natación", Type = "Nacional", Level = "Infantil" }
        );

        db.Athletes.AddRange(
            new Athlete { Id = 1, Name = "Karla Mendoza", Discipline = "Natación", Specialty = "Mariposa / Libre", Records = 4, Medals = 18, ImageUrl = "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=400&h=500&fit=crop&auto=format", Highlight = "Récord Nacional 100m Mariposa", Country = "Honduras" },
            new Athlete { Id = 2, Name = "Diego Flores", Discipline = "Clavados", Specialty = "Trampolín 3m / 10m", Records = 2, Medals = 11, ImageUrl = "https://images.unsplash.com/photo-1507034589631-9433cc6bc453?w=400&h=500&fit=crop&auto=format", Highlight = "Campeón Centroamericano 2024", Country = "Honduras" },
            new Athlete { Id = 3, Name = "Sofía Rivera", Discipline = "Sincronizado", Specialty = "Solo / Dueto", Records = 1, Medals = 9, ImageUrl = "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=500&fit=crop&auto=format", Highlight = "Subcampeona Panamericana", Country = "Honduras" },
            new Athlete { Id = 4, Name = "Marco Lara", Discipline = "Natación", Specialty = "Espalda / Combinado", Records = 3, Medals = 15, ImageUrl = "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=500&fit=crop&auto=format", Highlight = "Clasificatorio Olímpico Paris 2024", Country = "Honduras" }
        );

        db.TimeRecords.AddRange(
            new TimeRecord { Id = 1, Position = 1, AthleteName = "Karla Mendoza", Club = "Club Depor Tegucigalpa", Departamento = "Francisco Morazán", Categoria = "Absoluta", Prueba = "100m Mariposa", Tiempo = "57.43", Fecha = new DateTime(2025, 7, 5), Lugar = "Tegucigalpa", Record = true },
            new TimeRecord { Id = 2, Position = 2, AthleteName = "Lucía Aguilar", Club = "Natación SPS", Departamento = "Cortés", Categoria = "Absoluta", Prueba = "100m Mariposa", Tiempo = "58.91", Fecha = new DateTime(2025, 7, 5), Lugar = "Tegucigalpa", Record = false },
            new TimeRecord { Id = 3, Position = 3, AthleteName = "Daniela Reyes", Club = "Club Aqua Choluteca", Departamento = "Choluteca", Categoria = "Absoluta", Prueba = "100m Mariposa", Tiempo = "59.07", Fecha = new DateTime(2025, 7, 5), Lugar = "Tegucigalpa", Record = false },
            new TimeRecord { Id = 4, Position = 1, AthleteName = "Marco Lara", Club = "Tigres Acuáticos", Departamento = "Cortés", Categoria = "Absoluta", Prueba = "100m Espalda", Tiempo = "54.12", Fecha = new DateTime(2025, 6, 28), Lugar = "San Pedro Sula", Record = false },
            new TimeRecord { Id = 5, Position = 2, AthleteName = "Óscar Fuentes", Club = "Club Depor Tegucigalpa", Departamento = "Francisco Morazán", Categoria = "Absoluta", Prueba = "100m Espalda", Tiempo = "54.88", Fecha = new DateTime(2025, 6, 28), Lugar = "San Pedro Sula", Record = false },
            new TimeRecord { Id = 6, Position = 3, AthleteName = "Bryan Castellanos", Club = "Natación Comayagua", Departamento = "Comayagua", Categoria = "Absoluta", Prueba = "100m Espalda", Tiempo = "55.34", Fecha = new DateTime(2025, 6, 28), Lugar = "San Pedro Sula", Record = false },
            new TimeRecord { Id = 7, Position = 1, AthleteName = "Sofía Rivera", Club = "Club Acuático La Ceiba", Departamento = "Atlántida", Categoria = "Junior", Prueba = "200m Individual", Tiempo = "2:14.56", Fecha = new DateTime(2025, 6, 20), Lugar = "La Ceiba", Record = true },
            new TimeRecord { Id = 8, Position = 2, AthleteName = "Valeria Cruz", Club = "Tiburones del Norte", Departamento = "Cortés", Categoria = "Junior", Prueba = "200m Individual", Tiempo = "2:16.10", Fecha = new DateTime(2025, 6, 20), Lugar = "La Ceiba", Record = false },
            new TimeRecord { Id = 9, Position = 3, AthleteName = "Andrea Pineda", Club = "Club Aqua Choluteca", Departamento = "Choluteca", Categoria = "Junior", Prueba = "200m Individual", Tiempo = "2:18.45", Fecha = new DateTime(2025, 6, 20), Lugar = "La Ceiba", Record = false },
            new TimeRecord { Id = 10, Position = 1, AthleteName = "Diego Flores", Club = "Tigres Acuáticos", Departamento = "Cortés", Categoria = "Absoluta", Prueba = "200m Mariposa", Tiempo = "1:58.23", Fecha = new DateTime(2025, 6, 15), Lugar = "San Pedro Sula", Record = false },
            new TimeRecord { Id = 11, Position = 1, AthleteName = "Camila Martínez", Club = "Club Acuático La Ceiba", Departamento = "Atlántida", Categoria = "Juvenil", Prueba = "100m Libre", Tiempo = "58.34", Fecha = new DateTime(2025, 6, 10), Lugar = "La Ceiba", Record = false },
            new TimeRecord { Id = 12, Position = 2, AthleteName = "Paola Herrera", Club = "Natación SPS", Departamento = "Cortés", Categoria = "Juvenil", Prueba = "100m Libre", Tiempo = "59.01", Fecha = new DateTime(2025, 6, 10), Lugar = "La Ceiba", Record = false },
            new TimeRecord { Id = 13, Position = 3, AthleteName = "Fernanda López", Club = "Club Depor Tegucigalpa", Departamento = "Francisco Morazán", Categoria = "Juvenil", Prueba = "100m Libre", Tiempo = "59.67", Fecha = new DateTime(2025, 6, 10), Lugar = "La Ceiba", Record = false },
            new TimeRecord { Id = 14, Position = 1, AthleteName = "Mateo Soriano", Club = "Tiburones del Norte", Departamento = "Cortés", Categoria = "Juvenil", Prueba = "50m Libre", Tiempo = "24.89", Fecha = new DateTime(2025, 6, 10), Lugar = "La Ceiba", Record = false },
            new TimeRecord { Id = 15, Position = 2, AthleteName = "Andrés Núñez", Club = "Natación Comayagua", Departamento = "Comayagua", Categoria = "Juvenil", Prueba = "50m Libre", Tiempo = "25.12", Fecha = new DateTime(2025, 6, 10), Lugar = "La Ceiba", Record = false },
            new TimeRecord { Id = 16, Position = 1, AthleteName = "Isabella Mendoza", Club = "Club Aqua Choluteca", Departamento = "Choluteca", Categoria = "Infantil", Prueba = "50m Libre", Tiempo = "29.44", Fecha = new DateTime(2025, 6, 1), Lugar = "Choluteca", Record = true },
            new TimeRecord { Id = 17, Position = 2, AthleteName = "Sara Castillo", Club = "Club Depor Tegucigalpa", Departamento = "Francisco Morazán", Categoria = "Infantil", Prueba = "50m Libre", Tiempo = "29.98", Fecha = new DateTime(2025, 6, 1), Lugar = "Choluteca", Record = false },
            new TimeRecord { Id = 18, Position = 3, AthleteName = "Renata Paz", Club = "Natación SPS", Departamento = "Cortés", Categoria = "Infantil", Prueba = "50m Libre", Tiempo = "30.21", Fecha = new DateTime(2025, 6, 1), Lugar = "Choluteca", Record = false },
            new TimeRecord { Id = 19, Position = 1, AthleteName = "Emilio Vargas", Club = "Tigres Acuáticos", Departamento = "Cortés", Categoria = "Infantil", Prueba = "100m Pecho", Tiempo = "1:14.33", Fecha = new DateTime(2025, 6, 1), Lugar = "Choluteca", Record = false },
            new TimeRecord { Id = 20, Position = 1, AthleteName = "Roberto Mejía", Club = "Club Acuático La Ceiba", Departamento = "Atlántida", Categoria = "Junior", Prueba = "200m Libre", Tiempo = "1:52.67", Fecha = new DateTime(2025, 5, 25), Lugar = "Tegucigalpa", Record = false }
        );

        db.Gallery.AddRange(
            new GalleryItem { Id = 1, ImageUrl = "https://images.unsplash.com/photo-1530549387789-4c1017266635?w=600&h=400&fit=crop&auto=format", Alt = "Competencia de natación", Span = "col-span-2 row-span-2" },
            new GalleryItem { Id = 2, ImageUrl = "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop&auto=format", Alt = "Nadador en acción", Span = "" },
            new GalleryItem { Id = 3, ImageUrl = "https://images.unsplash.com/photo-1544551763-92ab472cad5d?w=400&h=300&fit=crop&auto=format", Alt = "Clavadista en competencia", Span = "" },
            new GalleryItem { Id = 4, ImageUrl = "https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?w=400&h=300&fit=crop&auto=format", Alt = "Entrenamiento acuático", Span = "" },
            new GalleryItem { Id = 5, ImageUrl = "https://images.unsplash.com/photo-1560090995-5e9c2a9c4fc8?w=400&h=300&fit=crop&auto=format", Alt = "Waterpolo partido", Span = "" },
            new GalleryItem { Id = 6, ImageUrl = "https://images.unsplash.com/photo-1519315901367-f34ff9154487?w=600&h=300&fit=crop&auto=format", Alt = "Nado sincronizado", Span = "col-span-2" }
        );

        db.Sponsors.AddRange(
            new Sponsor { Id = 1, Name = "Banco Atlántida", Tier = "Platino" },
            new Sponsor { Id = 2, Name = "Cerveza Salva Vida", Tier = "Platino" },
            new Sponsor { Id = 3, Name = "Tigo Honduras", Tier = "Oro" },
            new Sponsor { Id = 4, Name = "BANPAIS", Tier = "Oro" },
            new Sponsor { Id = 5, Name = "Secretaría de Deportes", Tier = "Oro" },
            new Sponsor { Id = 6, Name = "COH", Tier = "Plata" },
            new Sponsor { Id = 7, Name = "Agua Crystal", Tier = "Plata" },
            new Sponsor { Id = 8, Name = "Speedo Honduras", Tier = "Plata" }
        );

        db.SaveChanges();
    }
}
