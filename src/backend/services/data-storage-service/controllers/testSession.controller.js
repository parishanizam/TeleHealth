const TestSession = require('../models/TestSession');

// 1) CREATE
exports.createTestSession = async (req, res) => {
  try {
    const { sessionId, username, answers, duration, videoFileName } = req.body;

    const newSession = await TestSession.create({
      sessionId,
      username,
      answers,
      duration,
      videoFileName,
    });

    return res.status(201).json({
      message: 'Test session created successfully',
      testSession: newSession,
    });
  } catch (error) {
    console.error('Error creating test session:', error);
    return res.status(500).json({
      message: 'Internal server error',
      error: error.message,
    });
  }
};

// 2) GET one test session by sessionId
exports.getTestSession = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const foundSession = await TestSession.findOne({ sessionId });
    if (!foundSession) {
      return res.status(404).json({ message: 'Test session not found' });
    }
    return res.status(200).json(foundSession);
  } catch (error) {
    console.error('Error fetching test session:', error);
    return res.status(500).json({
      message: 'Internal server error',
      error: error.message,
    });
  }
};

// 3) GET all test sessions
exports.getAllTestSessions = async (req, res) => {
  try {
    const allSessions = await TestSession.find();
    return res.status(200).json(allSessions);
  } catch (error) {
    console.error('Error fetching all test sessions:', error);
    return res.status(500).json({
      message: 'Internal server error',
      error: error.message,
    });
  }
};

// 4) UPDATE (PATCH) a test session
exports.updateTestSession = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const updates = req.body; 
    const updatedSession = await TestSession.findOneAndUpdate(
      { sessionId },
      updates,
      { new: true }
    );
    if (!updatedSession) {
      return res.status(404).json({ message: 'Test session not found' });
    }
    return res.status(200).json({
      message: 'Test session updated successfully',
      testSession: updatedSession,
    });
  } catch (error) {
    console.error('Error updating test session:', error);
    return res.status(500).json({
      message: 'Internal server error',
      error: error.message,
    });
  }
};

// 5) DELETE a test session
exports.deleteTestSession = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const deletedSession = await TestSession.findOneAndDelete({ sessionId });
    if (!deletedSession) {
      return res.status(404).json({ message: 'Test session not found' });
    }
    return res.status(200).json({
      message: 'Test session deleted successfully',
      testSession: deletedSession,
    });
  } catch (error) {
    console.error('Error deleting test session:', error);
    return res.status(500).json({
      message: 'Internal server error',
      error: error.message,
    });
  }
};
