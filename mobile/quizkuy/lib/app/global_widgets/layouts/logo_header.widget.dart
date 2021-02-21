import 'package:flutter/material.dart';
import 'package:quizkuy/app/theme/text_style.dart';

class LogoHeader extends StatelessWidget {
  const LogoHeader({
    Key key,
    @required this.title,
  }) : super(key: key);

  final String title;

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        SizedBox(
          height: 25,
        ),
        Image.asset(
          'assets/logo.png',
          width: 125,
          height: 125,
        ),
        RichText(
          text: TextSpan(
            style: ThemeTextStyle(
              color: Colors.white,
              fontWeight: FontWeight.w200,
              fontSize: 28,
            ),
            children: [
              TextSpan(
                text: 'Quiz',
                style: ThemeTextStyle(
                  fontWeight: FontWeight.w700,
                ),
              ),
              TextSpan(
                text: 'Kuy',
              ),
            ],
          ),
        ),
        Text(
          title,
          style: ThemeTextStyle(
            color: Colors.white,
            fontWeight: FontWeight.w200,
            fontSize: 16,
          ),
        ),
        SizedBox(
          height: 25,
        ),
      ],
    );
  }
}
