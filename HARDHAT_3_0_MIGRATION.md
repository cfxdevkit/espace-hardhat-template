# Hardhat 3.0 Migration Guide

## Current Status

This project is currently using **Hardhat 2.27.0** (updated November 18, 2025). Hardhat 3.0 is available but has not been adopted yet due to breaking changes and dependency considerations.

## Why We Haven't Upgraded to Hardhat 3.0 Yet

### Breaking Changes
- Hardhat 3.0 introduces significant breaking changes to the API and configuration
- Several ecosystem packages need updates to be compatible with Hardhat 3.0

### Dependency Vulnerabilities
While Hardhat 2.27.0 has 13 low-severity vulnerabilities, they are in transitive dependencies:
- `cookie` (v0.6.0) - Out of bounds character vulnerability
- `tmp` (v0.2.3) - Symbolic link vulnerability
- `solc` (includes vulnerable dependencies)

These vulnerabilities can only be fully resolved by upgrading to Hardhat 3.0.15, which introduces breaking changes.

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
# 1. Update hardhat and plugins to 3.0 versions
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

The 13 low-severity vulnerabilities in the current setup are:
- Primarily in development dependencies (not in production code)
- Have low attack surface in a typical development environment
- Do not affect deployed contracts or runtime security

However, for production deployments or if you're concerned about supply chain security, consider upgrading when dependencies are ready.

---

Last Updated: November 18, 2025
Current Hardhat Version: 2.27.0
