// tests/mock-db.test.js
// Dedicated tests for mock database adapter activation, safety gating, query filtering, and mutations.

describe('💾 Mock Database Adapter Suite', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...originalEnv };
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  describe('Explicit Activation & Gating', () => {
    it('should throw an error if Supabase variables are missing and ENABLE_MOCK_DB is not true', () => {
      delete process.env.SUPABASE_URL;
      delete process.env.SUPABASE_SERVICE_ROLE_KEY;
      process.env.ENABLE_MOCK_DB = 'false';

      expect(() => {
        require('../api/db');
      }).toThrow('Database configuration is missing');
    });

    it('should allow mock mode activation outside production when ENABLE_MOCK_DB is true', () => {
      delete process.env.SUPABASE_URL;
      delete process.env.SUPABASE_SERVICE_ROLE_KEY;
      process.env.ENABLE_MOCK_DB = 'true';
      process.env.VERCEL_ENV = 'development';

      let db;
      expect(() => {
        db = require('../api/db');
      }).not.toThrow();
      expect(db.isMockMode).toBe(true);
    });

    it('should reject mock mode in production environment even if ENABLE_MOCK_DB is true', () => {
      delete process.env.SUPABASE_URL;
      delete process.env.SUPABASE_SERVICE_ROLE_KEY;
      process.env.ENABLE_MOCK_DB = 'true';
      process.env.VERCEL_ENV = 'production';

      expect(() => {
        require('../api/db');
      }).toThrow('Mock database must not run in production');
    });
  });

  describe('Query Filtering & Seeded Login Behavior', () => {
    let db;

    beforeEach(() => {
      delete process.env.SUPABASE_URL;
      delete process.env.SUPABASE_SERVICE_ROLE_KEY;
      process.env.ENABLE_MOCK_DB = 'true';
      process.env.VERCEL_ENV = 'development';
      db = require('../api/db');
    });

    it('should fetch the seeded administrator account for login', async () => {
      const results = await db.select('coordinators', 'email=eq.john@25Thirty.com');
      expect(results).toHaveLength(1);
      expect(results[0]).toMatchObject({
        email: 'john@25Thirty.com',
        role: 'Admin',
        approved: true
      });
      expect(results[0].password_hash).toBeDefined();
    });

    it('should filter query results by eq operation', async () => {
      const results = await db.select('schools', 'city=eq.Munich');
      expect(results).toHaveLength(1);
      expect(results[0].name).toBe('Goethe-Gymnasium');
    });

    it('should filter query results by date gte/lte operations', async () => {
      // Seeded logs created_at timestamps are configured relative to NOW() in seed
      const results = await db.select('logs', 'type=eq.System Action');
      expect(results).toHaveLength(1);
      
      const timestamp = results[0].created_at;
      const pastTime = new Date(Date.now() - 40 * 24 * 3600 * 1000).toISOString();
      const futureTime = new Date(Date.now() + 5 * 24 * 3600 * 1000).toISOString();

      const matchesGte = await db.select('logs', `created_at=gte.${pastTime}`);
      expect(matchesGte.length).toBeGreaterThanOrEqual(1);

      const matchesLte = await db.select('logs', `created_at=lte.${futureTime}`);
      expect(matchesLte.length).toBeGreaterThanOrEqual(1);
    });
  });

  describe('Mock Mutation Semantics (Insert, Update, Delete)', () => {
    let db;

    beforeEach(() => {
      delete process.env.SUPABASE_URL;
      delete process.env.SUPABASE_SERVICE_ROLE_KEY;
      process.env.ENABLE_MOCK_DB = 'true';
      process.env.VERCEL_ENV = 'development';
      db = require('../api/db');
    });

    it('should support inserting new records', async () => {
      const newSchool = {
        id: 'school_test',
        name: 'Test Academy',
        city: 'Lyon',
        country: 'France'
      };

      const result = await db.insert('schools', newSchool);
      expect(result).toMatchObject(newSchool);

      const selectResult = await db.select('schools', 'id=eq.school_test');
      expect(selectResult).toHaveLength(1);
      expect(selectResult[0].name).toBe('Test Academy');
    });

    it('should support updating records based on match query', async () => {
      await db.update('coordinators', { name: 'Mrs. Jane Smith' }, 'id=eq.coord_1');
      const selectResult = await db.select('coordinators', 'id=eq.coord_1');
      expect(selectResult[0].name).toBe('Mrs. Jane Smith');
    });

    it('should support deleting records based on match query', async () => {
      const startCount = (await db.select('students')).length;
      await db.delete('students', 'id=eq.stud_1');
      const endCount = (await db.select('students')).length;
      expect(endCount).toBe(startCount - 1);

      const selectResult = await db.select('students', 'id=eq.stud_1');
      expect(selectResult).toHaveLength(0);
    });
  });
});
