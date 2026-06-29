import { Router, Request, Response } from 'express';
import * as playgroundService from '../services/playground.service';

const router = Router();

/**
 * POST /api/playground/encrypt
 * Encrypt a message with RSA
 */
router.post('/encrypt', async (req: Request, res: Response) => {
  try {
    const { message, algorithm, keySize } = req.body;

    if (!message || !algorithm || !keySize) {
      return res.status(400).json({
        success: false,
        message: 'Message, algorithm, and keySize are required',
      });
    }

    let result;
    if (algorithm.startsWith('RSA')) {
      result = playgroundService.encryptWithRSA(message, keySize);
    } else if (algorithm.startsWith('Kyber')) {
      result = playgroundService.encryptWithKyber(message, algorithm);
    } else {
      return res.status(400).json({
        success: false,
        message: 'Unknown algorithm',
      });
    }

    res.json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error('Error encrypting:', error);
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : 'Encryption failed',
    });
  }
});

/**
 * POST /api/playground/decrypt
 * Decrypt RSA ciphertext
 */
router.post('/decrypt', async (req: Request, res: Response) => {
  try {
    const { ciphertext, algorithm, keySize } = req.body;

    if (!ciphertext || !algorithm || !keySize) {
      return res.status(400).json({
        success: false,
        message: 'Ciphertext, algorithm, and keySize are required',
      });
    }

    const result = playgroundService.decryptWithRSA(ciphertext, keySize);

    res.json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error('Error decrypting:', error);
    res.status(500).json({
      success: false,
      message: 'Decryption failed',
    });
  }
});

/**
 * POST /api/playground/quantum-attack
 * Simulate Shor's algorithm quantum attack
 */
router.post('/quantum-attack', async (req: Request, res: Response) => {
  try {
    const { keySize } = req.body;

    if (!keySize) {
      return res.status(400).json({
        success: false,
        message: 'keySize is required',
      });
    }

    const simulation = playgroundService.simulateShorsAlgorithm(keySize);

    res.json({
      success: true,
      data: simulation,
    });
  } catch (error) {
    console.error('Error simulating quantum attack:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to simulate quantum attack',
    });
  }
});

/**
 * GET /api/playground/algorithms
 * Get available algorithms with recommendations
 */
router.get('/algorithms', async (req: Request, res: Response) => {
  try {
    const recommendations = playgroundService.getAlgorithmRecommendations();
    const speeds = playgroundService.compareEncryptionSpeeds();

    res.json({
      success: true,
      data: {
        recommendations,
        speeds,
      },
    });
  } catch (error) {
    console.error('Error fetching algorithms:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch algorithms',
    });
  }
});

/**
 * GET /api/playground/speeds
 * Get encryption speed comparisons
 */
router.get('/speeds', async (req: Request, res: Response) => {
  try {
    const speeds = playgroundService.compareEncryptionSpeeds();

    res.json({
      success: true,
      data: speeds,
    });
  } catch (error) {
    console.error('Error fetching speeds:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch encryption speeds',
    });
  }
});

export default router;
