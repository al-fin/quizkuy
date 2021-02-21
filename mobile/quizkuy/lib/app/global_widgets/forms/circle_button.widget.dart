import 'package:flutter/material.dart';
import 'package:quizkuy/app/theme/colors.dart';

class CircleButton extends StatelessWidget {
  final Function onPressed;
  final bool isLoading;
  final IconData icon;

  const CircleButton({
    Key key,
    @required this.onPressed,
    @required this.isLoading,
    @required this.icon,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: EdgeInsets.all(10),
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(50),
        color: Colors.white.withOpacity(0.25),
      ),
      child: FloatingActionButton(
        onPressed: onPressed,
        backgroundColor: ThemeColors.LIGHT_BLUE,
        splashColor: ThemeColors.PRIMARY.withOpacity(0.15),
        elevation: 0,
        child: !isLoading
            ? Icon(
                icon,
                size: 36,
                color: ThemeColors.PRIMARY,
              )
            : CircularProgressIndicator(
                valueColor: new AlwaysStoppedAnimation<Color>(
                  ThemeColors.PRIMARY,
                ),
              ),
      ),
    );
  }
}
