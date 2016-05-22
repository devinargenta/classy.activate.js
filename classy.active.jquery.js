;(function($, window, document, undefined) {

	"use strict";
	var pluginName = "classy",
		defaults = {
			target: null,
			clickOff: true,
			className: "active",
			indexClass: null,
			onClick: function() {},
			onClose: function() {}
		};

	function Plugin(element, options) {
		this.element = element;

		this.$document = $(document);
		this.$body = $("body");
		this.settings = $.extend({}, defaults, options);
		this._defaults = defaults;
		this._name = "classy";
		if (this.settings.target == null) {
			this.settings.target = this.element;
		}
		if (this.settings.indexClass) {
			this.settings.className = this.settings.className + "-ele" + $(this.element).index();
		}

		this.init();
		this.CLICK_HANDLER = "CLICK_HANDLER";
		this.ACTIVATED = "ACTIVATED";
		this.DEACTIVATE = "DEACTIVATED";
		this.active = false;
		$.proxy( this.runClick(), this);

	}

	$.extend(Plugin.prototype, {
		init: function() {
			var _ = this;
			$(_.element).on("click", function() {
				if ($(_.settings.target).hasClass(_.settings.className)){
					 $(_).trigger(_.CLICK_HANDLER + _.DEACTIVATE)
					 if (_.settings.onClose) {
 							_.settings.onClose.call(this);
 					}
				} else {
					$(_).trigger(_.CLICK_HANDLER + _.ACTIVATED);
					if (_.settings.onClick) {
							_.settings.onClick.call(this);
					}
				}

			});

			$(_.element).bind('REMOVEALL', function(){
				$(_).trigger(_.CLICK_HANDLER + _.DEACTIVATE);
			});

			if (_.settings.clickOff && _.active !== false) {
				_.$document.on("click", function(event) {
					if (!$(event.target).closest($(_.settings.target)).length) {
						$(_).trigger(_.CLICK_HANDLER + _.DEACTIVATE);
					}
				});
			}

		},
		runClick: function() {
			var _ = this;
			$(_).on(_.CLICK_HANDLER + _.DEACTIVATE, function() {
				$(_.settings.target).removeClass(_.settings.className);
				_.active = false;

			}).on(_.CLICK_HANDLER + _.ACTIVATED, function() {

				var _ = this;

				$(_.settings.target).addClass(_.settings.className);
				_.active = true;

			}).off(_.CLICK_HANDLER + _.DEACTIVATED);

		}

	});

	// A really lightweight plugin wrapper around the constructor,
	// preventing against multiple instantiations
	$.fn[pluginName] = function(options) {
		return this.each(function() {
			if (!$.data(this, "plugin_" + pluginName)) {
				$.data(this, "plugin_" + pluginName, new Plugin(this, options));
			}
		});
	};

})(jQuery, window, document);
