const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const { resolver: defaultResolver, transformer: defaultTransformer } = getDefaultConfig(__dirname);

/**
 * Metro configuration extended to support importing .svg files as React components
 */
const config = {
	transformer: {
		...defaultTransformer,
		babelTransformerPath: require.resolve('react-native-svg-transformer'),
	},
	resolver: {
		...defaultResolver,
		assetExts: defaultResolver.assetExts.filter(ext => ext !== 'svg'),
		sourceExts: [...defaultResolver.sourceExts, 'svg'],
	},
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
