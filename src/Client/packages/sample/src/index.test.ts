import { describe, it, expect } from 'vitest';
import { SamplePackage } from './index';

describe('SamplePackage', () => {
  it('should be instantiable', () => {
    const instance = new SamplePackage();
    expect(instance).toBeInstanceOf(SamplePackage);
  });

  it('should return the correct string from exampleMethod', () => {
    const instance = new SamplePackage();
    expect(instance.exampleMethod()).toBe('Example method from SamplePackage');
  });
}); 