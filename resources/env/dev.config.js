const adminUser = {
	"firstName":"Test",
	"userId":101,
	"lastName":"Admin",
	"password":"admin",
    "email":"admin@testdomain.com",
    "tasks":[
		{
			"name":"Task1",
			"startDate":"2020-03-02",
			"endDate":"2020-03-07",
			"description":"Should have milk, banana, almonds ect in the breakfast"
		},
			{
			"name":"Task2",
			"startDate":"2020-03-07",
			"endDate":"2020-03-09",
			"description":"Vist sinhagad fort"
		}
		]
}
const devConfig = {

    JWT_SECRET_TOKEN:'Yqwhjh34h',
    DB_URL:'mongodb://localhost:27017/UserDB',
    ENCRYPTION_KEY:'tegsth',
    ENCRYPTION_ALGORITHM:'aes256',
    JWT_SECRET_TOKEN:'Yqwhjh34h',
    PORT:3000,
    DEFAULT_ADMIN_USER:adminUser
};



module.exports = devConfig;