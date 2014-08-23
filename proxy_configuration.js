/**
 * A module representing a proxy configuration
 *
 * @module ProxyConfiguration
 * @author Colin Campbell coder@colin.geek.nz
 */
define( function() {

	/*
	 * The automatically detect settings bit mask
	 *
	 * @constant
	 * @type {byte}
	 */
	const AUTO_DETECT = 0x08;

	/*
	 * The automatic configuration script bit mask
	 *
	 * @constant
	 * @type {byte}
	 */
	const AUTO_CONFIG = 0x04;

	/*
	 * The use a proxy server for your LAN bit mask
	 *
	 * @constant
	 * @type {byte}
	 */
	const USE_PROXY = 0x02;

	/**
	 * Constructs a new proxy configuration
	 *
	 * @constructor
	 * @alias module:ProxyConfiguration
	 */
	var ProxyConfiguration = function() {

		this.__bytes = [
			0x46, 0x00, 0x00, 0x00,
			0x00, 0x00, 0x00, 0x00,
			0x01, 0x00, 0x00, 0x00
		];

		this.__autoDetect = new AutoDetectSetting( this );
		this.__autoConfig = new AutoConfigurationSetting( this );
		this.__useProxy = new UseProxySetting( this );
	};

	ProxyConfiguration.prototype = {

		/**
		 * Gets the auto detection setting
		 *
		 * @returns {AutoDetectSetting}
		 */
		'getAutoDetectSetting' : function() {
			return this.__autoDetect;
		},

		/**
		 * Gets the auto configuration setting
		 *
		 * @returns {AutoConfigurationSetting}
		 */
		'getAutoConfigurationSetting' : function() {
			return this.__autoConfig;
		},

		/**
		 * Gets the use proxy setting
		 *
		 * @returns {UseProxySetting}
		 */
		'getUseProxySetting' : function() {
			return this.__useProxy;
		},

		/**
		 * Gets the bytes as a byte array
		 *
		 * @returns {byte[]}
		 */
		'getBytes' : function() {
			return this.__bytes.slice();
		}
	};

	/**
	 * Contructs a new AutoDetectSetting
	 *
	 * @param {ProxyConfiguration} proxyConfiguration - the proxy configuration
	 *
	 * @constructor
	 * @private
	 */
	var AutoDetectSetting = function( proxyConfiguration ) {

		this.__proxyConfiguration = proxyConfiguration;
	};

	AutoDetectSetting.prototype = {

		/**
		 * Enables the automatically detect settings
		 *
		 * @param {boolean} [enable] - true to enable or false to disable, true
		 * by default
		 *
		 * @returns {ProxyConfiguration}
		 */
		'enable' : function( enable ) {
			if ( enable === undefined ) enable = true;

			if ( !enable ) return this.disable();
			var byte = this.__proxyConfiguration.__bytes[8];
			byte |= AUTO_DETECT;
			this.__proxyConfiguration.__bytes[8] = byte;
			return this.__proxyConfiguration;
		},

		/**
		 * Disables the automatically detect settings
		 *
		 * @returns {ProxyConfiguration}
		 */
		'disable' : function() {
			var byte = this.__proxyConfiguration.__bytes[8];
			byte &= ~AUTO_DETECT;
			this.__proxyConfiguration.__bytes[8] = byte;
			return this.__proxyConfiguration;
		},

		/**
		 * Determines if this setting is enabled
		 *
		 * @returns {boolean}
		 */
		'isEnabled' : function() {
			var byte = this.__proxyConfiguration.__bytes[8];
			return ( byte & AUTO_DETECT ) == AUTO_DETECT;
		},

		/*
		 * Gets the proxy configuration
		 *
		 * @returns {ProxyConfiguration}
		 */
		'getProxyConfiguration' : function() {
			return this.__proxyConfiguration;
		}
	};

	/**
	 * Contructs a new AutoConfigurationSetting
	 *
	 * @param {ProxyConfiguration} proxyConfiguration - the proxy configuration
	 *
	 * @constructor
	 * @private
	 */
	var AutoConfigurationSetting = function( proxyConfiguration ) {

		this.__proxyConfiguration = proxyConfiguration;
	}

	AutoConfigurationSetting.prototype = {

		/**
		 * Sets the address to the configuration script
		 *
		 * @param {string} address - the address
		 *
		 * @returns {ProxyConfiguration}
		 */
		'setAddress' : function( address ) {

			throw 'Method not yet implemented';
		},

		/**
		 * Gets the address to the configuration script
		 *
		 * @returns {string}
		 */
		'getAddress' : function() {

			throw 'Method not yet implemented';
		},

		/**
		 * Enables the use automatic configuration script
		 *
		 * @param {boolean} [enable] - true to enable or false to disable, true
		 * by default
		 *
		 * @returns {ProxyConfiguration}
		 */
		'enable' : function( enable ) {
			if ( enable === undefined ) enable = true;

			if ( !enable ) return this.disable();
			var byte = this.__proxyConfiguration.__bytes[8];
			byte |= AUTO_CONFIG;
			this.__proxyConfiguration.__bytes[8] = byte;
			return this.__proxyConfiguration;
		},

		/**
		 * Disables the use automatic configuration script
		 *
		 * @returns {ProxyConfiguration}
		 */
		'disable' : function() {
			var byte = this.__proxyConfiguration.__bytes[8];
			byte &= ~AUTO_CONFIG;
			this.__proxyConfiguration.__bytes[8] = byte;
			return this.__proxyConfiguration;
		},

		/**
		 * Determines if this setting is enabled
		 *
		 * @returns {boolean}
		 */
		'isEnabled' : function() {
			var byte = this.__proxyConfiguration.__bytes[8];
			return ( byte & AUTO_CONFIG ) == AUTO_CONFIG;
		},

		/*
		 * Gets the proxy configuration
		 *
		 * @returns {ProxyConfiguration}
		 */
		'getProxyConfiguration' : function() {
			return this.__proxyConfiguration;
		}
	};

	/**
	 * Contructs a new UseProxySetting
	 *
	 * @param {ProxyConfiguration} proxyConfiguration - the proxy configuration
	 *
	 * @constructor
	 * @private
	 */
	var UseProxySetting = function( proxyConfiguration ) {

		this.__proxyConfiguration = proxyConfiguration;
	};

	UseProxySetting.prototype = {

		/**
		 * Sets the proxy to use
		 *
		 * @param {Proxy} proxy - the proxy to use
		 * 
		 * @returns {ProxyConfiguration}
		 */
		'setProxy' : function( proxy ) {

			throw 'Method not yet implemented';
		},

		/**
		 * Gets the proxy
		 *
		 * @returns {Proxy}
		 */
		'getProxy' : function() {

			throw 'Method not yet implemented';
		},

		/**
		 * Enables the use proxy server setting
		 *
		 * @param {boolean} [enable] - true to enable or false to disable, true
		 * by default
		 *
		 * @returns {ProxyConfiguration}
		 */
		'enable' : function( enable ) {
			if ( enable === undefined ) enable = true;

			if ( !enable ) return this.disable();
			var byte = this.__proxyConfiguration.__bytes[8];
			byte |= USE_PROXY;
			this.__proxyConfiguration.__bytes[8] = byte;
			return this.__proxyConfiguration;
		},

		/**
		 * Disables the use proxy server setting
		 *
		 * @returns {ProxyConfiguration}
		 */
		'disable' : function() {
			var byte = this.__proxyConfiguration.__bytes[8];
			byte &= ~USE_PROXY;
			this.__proxyConfiguration.__bytes[8] = byte;
			return this.__proxyConfiguration;
		},

		/**
		 * Determines if this setting is enabled
		 *
		 * @returns {boolean}
		 */
		'isEnabled' : function() {
			var byte = this.__proxyConfiguration.__bytes[8];
			return ( byte & USE_PROXY ) == USE_PROXY;
		},

		/*
		 * Gets the proxy configuration
		 *
		 * @returns {ProxyConfiguration}
		 */
		'getProxyConfiguration' : function() {
			return this.__proxyConfiguration;
		}
	};

	return ProxyConfiguration;
});
