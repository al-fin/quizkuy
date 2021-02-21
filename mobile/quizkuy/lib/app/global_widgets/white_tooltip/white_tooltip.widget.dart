import 'package:flutter/material.dart';

class WhiteTooltip extends StatelessWidget {
  const WhiteTooltip({
    Key key,
    @required this.child,
    @required this.message,
  }) : super(key: key);

  final Widget child;
  final String message;

  @override
  Widget build(BuildContext context) {
    return Tooltip(
      textStyle: TextStyle(color: Colors.grey),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(10),
        boxShadow: [
          BoxShadow(
            blurRadius: 3,
            offset: Offset(0, 3),
            color: Colors.black.withOpacity(0.15),
          )
        ],
      ),
      message: message,
      child: child,
    );
  }
}
