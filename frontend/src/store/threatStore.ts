import { create } from 'zustand';
import {
  ThreatItem,
  ThreatFeed,
  ThreatLevel,
  ThreatStats,
} from '../types/threat.types';
import * as threatService from '../services/threatService';

interface ThreatStore {
  // State
  feed: ThreatFeed | null;
  liveThreats: ThreatItem[];
  threatLevel: ThreatLevel | null;
  advisories: ThreatItem[];
  vendorAlerts: ThreatItem[];
  stats: ThreatStats | null;
  loading: boolean;
  error: string | null;

  // Actions
  fetchFeed: (page?: number, limit?: number, category?: string, severity?: string) => Promise<void>;
  fetchLiveFeed: () => Promise<void>;
  fetchThreatLevel: () => Promise<void>;
  fetchAdvisories: () => Promise<void>;
  fetchVendorAlerts: () => Promise<void>;
  fetchStats: () => Promise<void>;
  fetchAll: () => Promise<void>;
  reset: () => void;
}

export const useThreatStore = create<ThreatStore>((set, get) => ({
  // Initial state
  feed: null,
  liveThreats: [],
  threatLevel: null,
  advisories: [],
  vendorAlerts: [],
  stats: null,
  loading: false,
  error: null,

  // Actions
  fetchFeed: async (page = 1, limit = 20, category, severity) => {
    set({ loading: true, error: null });
    try {
      const feed = await threatService.getThreatFeed(page, limit, category, severity);
      set({ feed, loading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to fetch threat feed',
        loading: false,
      });
    }
  },

  fetchLiveFeed: async () => {
    try {
      const liveThreats = await threatService.getLiveThreats();
      set({ liveThreats });
    } catch (error) {
      console.error('Failed to fetch live feed:', error);
    }
  },

  fetchThreatLevel: async () => {
    set({ loading: true, error: null });
    try {
      const threatLevel = await threatService.getThreatLevel();
      set({ threatLevel, loading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to fetch threat level',
        loading: false,
      });
    }
  },

  fetchAdvisories: async () => {
    set({ loading: true, error: null });
    try {
      const advisories = await threatService.getAdvisories();
      set({ advisories, loading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to fetch advisories',
        loading: false,
      });
    }
  },

  fetchVendorAlerts: async () => {
    set({ loading: true, error: null });
    try {
      const vendorAlerts = await threatService.getVendorAlerts();
      set({ vendorAlerts, loading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to fetch vendor alerts',
        loading: false,
      });
    }
  },

  fetchStats: async () => {
    set({ loading: true, error: null });
    try {
      const stats = await threatService.getThreatStats();
      set({ stats, loading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to fetch statistics',
        loading: false,
      });
    }
  },

  fetchAll: async () => {
    set({ loading: true, error: null });
    try {
      const [feed, liveThreats, threatLevel, advisories, vendorAlerts, stats] = await Promise.all([
        threatService.getThreatFeed(1, 20),
        threatService.getLiveThreats().catch(() => []),
        threatService.getThreatLevel(),
        threatService.getAdvisories(),
        threatService.getVendorAlerts(),
        threatService.getThreatStats(),
      ]);

      set({
        feed,
        liveThreats,
        threatLevel,
        advisories,
        vendorAlerts,
        stats,
        loading: false,
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to fetch threat data',
        loading: false,
      });
    }
  },

  reset: () => {
    set({
      feed: null,
      liveThreats: [],
      threatLevel: null,
      advisories: [],
      vendorAlerts: [],
      stats: null,
      loading: false,
      error: null,
    });
  },
}));
