var seeder = require('mongoose-seed');
 
// Connect to MongoDB via Mongoose 
seeder.connect(process.env.MONGO_URL, function() {
 
    // Load Mongoose models 
    seeder.loadModels([
        '../src/models/user.js'
    ]);
 
    // Clear specified collections 
    seeder.clearModels(['User'], function() {
 
        // Callback to populate DB once collections have been cleared 
        seeder.populateModels(data, function() {
            process.exit(0);
        });
    });
});
 
// Data array containing seed data - documents organized by Model 
var data = [
    {
        'model': 'User',
        'documents': [
            {
                'username': 'troy',
                'password': 'ambrose-coach'
            }
        ]
    }
];
 
