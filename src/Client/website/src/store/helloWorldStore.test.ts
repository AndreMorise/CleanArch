import { describe, it, expect, beforeEach } from 'vitest';
import { helloWorldStore, helloWorldActions } from './helloWorldStore';

describe('HelloWorld Store', () => {
  beforeEach(() => {
    // Reset the store before each test
    helloWorldActions.reset();
  });

  it('should have initial state', () => {
    const state = helloWorldStore.state;
    expect(state.greeting).toBe('');
    expect(state.name).toBe('');
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe(null);
  });

  it('should set name correctly', () => {
    helloWorldActions.setName('Test User');
    expect(helloWorldStore.state.name).toBe('Test User');
  });

  it('should set loading state', () => {
    helloWorldActions.startLoading();
    expect(helloWorldStore.state.isLoading).toBe(true);
    expect(helloWorldStore.state.error).toBe(null);
  });

  it('should set greeting and reset loading state', () => {
    helloWorldActions.startLoading();
    helloWorldActions.setGreeting('Hello, Test User!');
    
    expect(helloWorldStore.state.greeting).toBe('Hello, Test User!');
    expect(helloWorldStore.state.isLoading).toBe(false);
    expect(helloWorldStore.state.error).toBe(null);
  });

  it('should set error and reset loading state', () => {
    helloWorldActions.startLoading();
    helloWorldActions.setError('Error message');
    
    expect(helloWorldStore.state.error).toBe('Error message');
    expect(helloWorldStore.state.isLoading).toBe(false);
  });

  it('should reset all state values', () => {
    // Set some values first
    helloWorldActions.setName('Test User');
    helloWorldActions.setGreeting('Hello, Test User!');
    
    // Then reset
    helloWorldActions.reset();
    
    // Verify reset
    expect(helloWorldStore.state.greeting).toBe('');
    expect(helloWorldStore.state.name).toBe('');
    expect(helloWorldStore.state.isLoading).toBe(false);
    expect(helloWorldStore.state.error).toBe(null);
  });
}); 