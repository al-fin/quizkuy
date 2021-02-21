import 'package:flutter/material.dart';

class WhiteBottomSheet extends StatelessWidget {
  const WhiteBottomSheet({
    Key key,
    @required this.child,
  }) : super(key: key);

  final Widget child;

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: EdgeInsets.all(10),
      width: double.infinity,
      decoration: BoxDecoration(
        color: Colors.white,
        boxShadow: [
          BoxShadow(
            blurRadius: 6,
            offset: Offset(0, -3),
            color: Colors.black.withOpacity(0.15),
          )
        ],
      ),
      child: child,
    );
  }
}
