'use strict';


angular

    .module( 'directives', [])


    .directive( 'ngScroll', [ '$parse', function( $parse ) {
        return {
            link: function( scope, element, attributes ) {
                var fn = $parse( attributes.ngScroll );
                element = element[ 0 ].tagName === 'HTML' ? angular.element( document ) : element;

                element.bind( 'scroll', function( event ) {
                    scope.$apply(function() {
                        fn( scope, { $event: event });
                    });
                });
            }
        };
    }]);