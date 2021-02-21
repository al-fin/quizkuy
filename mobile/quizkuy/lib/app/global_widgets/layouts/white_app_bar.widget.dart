import 'package:flutter/material.dart';
import 'package:quizkuy/app/theme/colors.dart';
import 'package:quizkuy/app/theme/text_style.dart';

class WhiteAppBar extends StatelessWidget {
  const WhiteAppBar({
    Key key,
    @required this.title,
  }) : super(key: key);

  final String title;

  @override
  Widget build(BuildContext context) {
    return AppBar(
      backgroundColor: Colors.white,
      centerTitle: true,
      iconTheme: IconThemeData(color: ThemeColors.PRIMARY),
      title: Text(
        title,
        style: ThemeTextStyle(
          color: ThemeColors.PRIMARY,
          fontWeight: FontWeight.w500,
        ),
      ),
    );
  }
}
