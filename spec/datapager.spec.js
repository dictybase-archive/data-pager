var Pager = require('../lib/datapager');
var data = [
               {
                  "country" : "JAPAN",
                  "email" : "tkawata@bio.sci.toho-u.ac.jp",
                  "city" : "Funabashi",
                  "name" : "Takefumi Kawata",
                  "address" : "2-2-1 Miyama",
                  "institution" : "Toho University"
               },
               {
                  "country" : "USA",
                  "email" : "ark1@helix.nih.gov",
                  "city" : "Bethesda",
                  "name" : "Alan Kimmel",
                  "address" : "50/3351",
                  "institution" : "NIH"
               },
               {
                  "country" : "INDIA",
                  "email" : "nameetam@gmail.com",
                  "city" : "BANGALORE",
                  "name" : "Nameeta Mujumdar",
                  "address" : "INDIAN INSTITUTE OF SCIENCE",
                  "institution" : "IISc"
               },
               {
                  "country" : "USA",
                  "email" : "pfey@northwestern.edu",
                  "city" : "Chicago",
                  "name" : "Petra Fey",
                  "address" : "NUBIC/NUCATS",
                  "institution" : "Northwestern University"
               },
               {
                  "country" : "Germany",
                  "email" : "maniak@uni-kassel.de",
                  "city" : "Kassel",
                  "name" : "Markus Maniak",
                  "address" : "Heinrich-Plett-Str. 40",
                  "institution" : "Universitaet Kassel"
               },
               {
                  "country" : "Japan",
                  "email" : "oohata@makino.kmu.ac.jp",
                  "city" : "Hirakata",
                  "name" : "Akiko Oohata",
                  "address" : "Uyamahigashi-machi",
                  "institution" : "Kansai Medical Univ."
               },
               {
                  "country" : "France",
                  "email" : "gklein@cea.fr",
                  "city" : "Grenoble Cedex 09",
                  "name" : "Gerard Klein",
                  "address" : "Biochimie et Biophysique des Systemes Integres",
                  "institution" : "CEA-Grenoble"
               },
               {
                  "country" : "UK",
                  "email" : "te30@gre.ac.uk",
                  "city" : "Chatham Maritime",
                  "name" : "Elinor Thompson",
                  "address" : "School of Science",
                  "institution" : "University of Greenwich"
               },
               {
                  "country" : "Australia",
                  "email" : "C.Barth@latrobe.edu.au",
                  "city" : "Bundoora",
                  "name" : "Christian Barth",
                  "address" : "Kingsbury Drive",
                  "institution" : "La Trobe University"
               },
               {
                  "country" : "Brazil",
                  "email" : "almsilva@iq.usp.br",
                  "city" : "Sao Paulo",
                  "name" : "Aline da Silva",
                  "address" : "Av. Prof. Lineu Prestes 748",
                  "institution" : "Universidade de Sao Paulo"
               }
];

describe('A pager spec with even page size', function() {
    var pager;
    beforeEach(function() {
        pager = new Pager({data: data, pageSize: 2});
    });
    afterEach(function() {
        pager = null;
    });

    it('should get paging index form second page', function() {
        idx = pager.getDataIndex(2);
        expect(idx.get(0)).toEqual(2);
        expect(idx.get(1)).toEqual(3);
    });
    it('should get paging index form last page', function() {
        idx = pager.getDataIndex(5);
        expect(idx.get(0)).toEqual(8);
        expect(idx.get(1)).toEqual(9);
    });

    it('should get the data from third page', function() {
        dataList = pager.getDataByPage(3);
        expect(dataList.size).toEqual(2);
        expect(dataList.get(0).city).toEqual("Kassel");
        expect(dataList.get(1).country).toEqual("Japan");
    });
});


describe('A pager spec with odd page size', function() {
    var pager;
    beforeEach(function() {
        pager = new Pager({data: data, pageSize: 3});
    });
    afterEach(function() {
        pager = null;
    });

    it('should get paging index form second page', function() {
        idx = pager.getDataIndex(2);
        expect(idx.get(0)).toEqual(3);
        expect(idx.get(1)).toEqual(5);
    });
    it('should get paging index form last page', function() {
        idx = pager.getDataIndex(4);
        expect(idx.get(0)).toEqual(9);
        expect(idx.get(1)).toEqual(9);
    });

    it('should get the data from third page', function() {
        dataList = pager.getDataByPage(3);
        expect(dataList.size).toEqual(3);
        expect(dataList.get(0).country).toEqual("France");
        expect(dataList.get(1).country).toEqual("UK");
        expect(dataList.get(2).country).toEqual("Australia");
    });
});
