'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface ModelConfig {
  id: string;
  scale: number;
  slotPosition: [number, number, number];
  rotation: [number, number, number];
}

interface ModelConfigMap {
  [id: string]: ModelConfig;
}

interface ConfigContextType {
  config: ModelConfigMap;
  isLoading: boolean;
  updateConfig: (id: string, config: Partial<ModelConfig>) => Promise<void>;
}

const ConfigContext = createContext<ConfigContextType | null>(null);

export function ConfigProvider({ children }: { children: ReactNode }) {
  const [config, setConfig] = useState<ModelConfigMap>({});
  const [isLoading, setIsLoading] = useState(true);

  const loadConfig = async () => {
    try {
      const res = await fetch(`/data/model-config.json?t=${Date.now()}`);
      const data = await res.json();
      const map: ModelConfigMap = {};
      data.items.forEach((item: ModelConfig) => {
        map[item.id] = item;
      });
      setConfig(map);
    } catch (error) {
      console.error('Failed to load model config:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadConfig();
  }, []);

  const updateConfig = async (id: string, updates: Partial<ModelConfig>) => {
    try {
      await fetch('/api/save-catalog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ itemId: id, ...updates }),
      });
      // Reload config after save
      await loadConfig();
    } catch (error) {
      console.error('Failed to update config:', error);
      throw error;
    }
  };

  return (
    <ConfigContext.Provider value={{ config, isLoading, updateConfig }}>
      {children}
    </ConfigContext.Provider>
  );
}

export function useModelConfig() {
  const context = useContext(ConfigContext);
  if (!context) {
    throw new Error('useModelConfig must be used within ConfigProvider');
  }
  return context;
}

export function mergeWithConfig<T extends { id: string; scale: number; slotPosition: [number, number, number]; rotation?: number[] | [number, number, number] }>(
  item: T,
  configMap: ModelConfigMap
): T & { scale: number; slotPosition: [number, number, number]; rotation: [number, number, number] } {
  const config = configMap[item.id];
  return {
    ...item,
    scale: config?.scale ?? item.scale,
    slotPosition: config?.slotPosition ?? item.slotPosition,
    rotation: config?.rotation ?? (item.rotation || [0, 0, 0]) as [number, number, number],
  };
}