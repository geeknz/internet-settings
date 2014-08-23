/**
 * A module representing a proxy
 *
 * @module Proxy
 * @author Colin Campbell coder@colin.geek.nz
  */
define( function() {

	/**
	 * Constructs a new proxy for a specified host and port
	 *
	 * @constructor
	 * @param {string} host - the proxy's host
	 * @param {string} port - the proxy's port
	 * @alias module:Proxy
	 */
	var Proxy = function( host, port ) {
		this.host = host;
		this.port = port;
	};

	Proxy.prototype = {

		/**
		 * Gets the proxy's host
		 */
		'getHost' : function() {
			return this.host;
		},

		/**
		 * Gets the proxy's port
		 */
		'getPort' : function() {
			return this.port;
		}
	};

	/**
	 * Generates a proxy from a string
	 *
	 * @param {String} proxy - the proxy
	 * @returns {Proxy}
	 */
	Proxy.parseString = function( proxy ) {

		proxy = proxy.split( ':', 2 );
		return new Proxy( proxy[0], proxy[1] );
	};

	/**
	 * Generates a proxy from a byte array
	 * 
	 * @param {byte[]} bytes - the byte array
	 * @returns {Proxy}
	 */
	Proxy.parseByteArray = function( bytes ) {

		bytes = bytes.slice(); // copy byte array

		var host = ''; // get the hostname
		var byte = bytes.shift();
		while( byte != 0x3a ) { // 0x3a is the colon
			host += String.fromCharCode( byte, 16 );
			byte = bytes.shift();
		};

		var port = '' // get the port
		while( bytes.length > 0 ) {
			byte  = bytes.shift();
			port += String.fromCharCode( byte, 16 );
		}

		return new Proxy( host, port );
	};

	/**
	 * Generates a byte array from a proxy
	 *
	 * @param {Proxy} proxy - the proxy
	 * @returns {byte[]}
	 */
	Proxy.toByteArray = function( proxy ) {

		var byteArray = [];
		for ( var i = 0 ; i < proxy.getHost().length ; i++ ) {
			byteArray.push(
				proxy.getHost()
					.charCodeAt( i )
			);
		}

		byteArray.push( 0x3a ); // Push ':'

		for ( var i = 0 ; i < proxy.getPort().length ; i++ ) {
			byteArray.push(
				proxy.getPort()
					.charCodeAt( i )
			);
		}

		return byteArray;
	};

	return Proxy;
});
