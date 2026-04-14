# Hardhat 3.0 Migration Guide

## Current Status

This project is currently using **Hardhat 2.28.6**. Hardhat 3.x is available but has not been adopted yet due to breaking changes and dependency considerations.

## Why We Haven't Upgraded to Hardhat 3.0 Yet

### Breaking Changes
- Hardhat 3.0 introduces significant breaking changes to the API and configuration
- Several ecosystem packages need updates to be compatible with Hardhat 3.0

### Dependency Vulnerabilities
After updating to the latest compatible Hardhat 2.x toolchain and applying `npm audit fix`, the remaining vulnerabilities are still in transitive dependencies:
- `cookie` via `hardhat` / `@sentry/node`
- `tmp` via `solc`
- `undici` via `hardhat`
- `bn.js`, `elliptic`, `lodash`, and `serialize-javascript` through Hardhat 2.x ecosystem packages

These vulnerabilities cannot be fully resolved without moving to the Hardhat 3.x-compatible plugin line, which introduces breaking changes.

## When to Upgrade

Consider upgrading to Hardhat 3.0 when:

1. **All dependencies are compatible** - Wait for the Hardhat ecosystem to stabilize
2. **Your project is ready for breaking changes** - Plan for significant refactoring
3. **Security is critical** - If the low-severity vulnerabilities become a concern for your use case

## Key Changes in Hardhat 3.0

### Configuration Changes
- New configuration file format
- Updated plugin initialization
- Changes to task definitions

### API Changes
- `ethers` integration changes (Hardhat 3.0 moves away from direct ethers integration)
- Updated artifact format
- Changes to network configuration

### Plugin Updates Required
- `@nomicfoundation/hardhat-ignition-viem` - May need updates
- `@nomicfoundation/hardhat-toolbox-viem` - May need updates
- Custom plugins may require refactoring

## Migration Steps (When Ready)

When you decide to upgrade to Hardhat 3.0:

```bash
# 1. Update hardhat and plugins to 3.x versions
npm install --save-dev hardhat@^3.0.0
npm install --save-dev @nomicfoundation/hardhat-toolbox-viem@latest
npm install --save-dev @nomicfoundation/hardhat-ignition-viem@latest

# 2. Update hardhat.config.ts according to Hardhat 3.0 documentation
# 3. Update tasks in tasks/ directory
# 4. Update tests in test/ directory
# 5. Test thoroughly with local network

# 6. Run audit to verify vulnerabilities are resolved
npm audit
```

## References

- [Hardhat 3.0 Release Notes](https://docs.hardhat.org/docs)
- [Hardhat 3.0 Migration Guide](https://docs.hardhat.org/docs)
- [NPM Audit Report](https://www.npmjs.com/advisories)

## Security Note

The remaining advisories in the current setup are:
- Primarily in development dependencies (not in production code)
- Reduced after the latest Hardhat 2.x maintenance pass, but not eliminated
- Still tied to the Hardhat 2.x ecosystem and its transitive dependency graph

However, for production deployments or if you're concerned about supply chain security, consider upgrading when dependencies are ready.

---

Last Updated: April 14, 2026
Current Hardhat Version: 2.28.6
